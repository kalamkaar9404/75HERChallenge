/**
 * lib/blockchain.ts
 * ──────────────────
 * SERVER-ONLY  — never imported by client components.
 * All ethers.js calls happen here; the browser never touches a private key.
 *
 * Uses ethers v6 API (JsonRpcProvider, Wallet, Contract, keccak256, toUtf8Bytes).
 *
 * Environment variables required (set in frontend/.env.local):
 *   POLYGON_RPC_URL      — Alchemy / Infura / public Amoy RPC
 *   ADMIN_PRIVATE_KEY    — Hex private key of the Admin Wallet (no 0x prefix needed)
 *   CONTRACT_ADDRESS     — Deployed MedicalRegistry contract address on Amoy
 */

import { ethers } from 'ethers';

// ── ABI (only the functions we call) ─────────────────────────────────────────
const REGISTRY_ABI = [
  // write
  'function secureRecord(bytes32 fileHash) external',
  // read
  'function verifyRecord(bytes32 fileHash) external view returns (uint256 timestamp)',
  'function getRecordDetails(bytes32 fileHash) external view returns (uint256 timestamp, uint256 blockNumber)',
  // events
  'event RecordSecured(bytes32 indexed fileHash, uint256 timestamp, uint256 blockNumber)',
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RecordResult {
  /** keccak256 hash of the data (hex string with 0x prefix) */
  fileHash: string;
  /** Ethers transaction hash, e.g. 0xabc... */
  txHash: string;
  /** Polygon Amoy block explorer URL */
  explorerUrl: string;
  /** Unix timestamp (seconds) recorded on-chain */
  timestamp?: number;
}

export interface VerifyResult {
  /** Whether the hash exists on-chain */
  verified: boolean;
  /** Unix timestamp (seconds) when anchored; 0 if not found */
  timestamp: number;
  /** Block number when anchored; 0 if not found */
  blockNumber: number;
  /** Human-readable date string */
  anchoredAt: string | null;
  /** Polygon Amoy explorer URL for the block */
  explorerUrl: string | null;
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function getProvider(): ethers.JsonRpcProvider {
  const rpc = process.env.POLYGON_RPC_URL;
  if (!rpc) throw new Error('POLYGON_RPC_URL is not set in environment variables.');
  return new ethers.JsonRpcProvider(rpc);
}

function getAdminWallet(provider: ethers.JsonRpcProvider): ethers.Wallet {
  const pk = process.env.ADMIN_PRIVATE_KEY;
  if (!pk) throw new Error('ADMIN_PRIVATE_KEY is not set in environment variables.');
  // ethers v6 accepts keys with or without the 0x prefix
  return new ethers.Wallet(pk.startsWith('0x') ? pk : `0x${pk}`, provider);
}

function getContract(signer: ethers.Wallet): ethers.Contract {
  const addr = process.env.CONTRACT_ADDRESS;
  if (!addr) throw new Error('CONTRACT_ADDRESS is not set in environment variables.');
  return new ethers.Contract(addr, REGISTRY_ABI, signer);
}

function getReadContract(provider: ethers.JsonRpcProvider): ethers.Contract {
  const addr = process.env.CONTRACT_ADDRESS;
  if (!addr) throw new Error('CONTRACT_ADDRESS is not set in environment variables.');
  return new ethers.Contract(addr, REGISTRY_ABI, provider);
}

/**
 * Deterministically hash any string / object to a bytes32 keccak256 digest.
 * Mirrors the pattern: keccak256(toUtf8Bytes(JSON.stringify(data)))
 */
export function hashData(data: unknown): string {
  const text = typeof data === 'string' ? data : JSON.stringify(data);
  return ethers.keccak256(ethers.toUtf8Bytes(text));
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * silentlyRecordHash
 * ───────────────────
 * 1. SHA-256 (keccak256) the input data.
 * 2. Call secureRecord() on the MedicalRegistry contract via the Admin Wallet.
 * 3. Wait for 1 confirmation (fast on Amoy ~2 s per block).
 * 4. Log the tx hash + explorer URL to the server console as demo proof.
 * 5. Return structured metadata to the caller.
 *
 * NEVER throws — on any error it returns null so the UI degrades gracefully.
 */
export async function silentlyRecordHash(data: unknown): Promise<RecordResult | null> {
  try {
    const provider  = getProvider();
    const wallet    = getAdminWallet(provider);
    const contract  = getContract(wallet);
    const fileHash  = hashData(data);

    console.log(`[Blockchain] Anchoring hash ${fileHash} via Admin Wallet ${wallet.address}`);

    const tx = await contract.secureRecord(fileHash) as ethers.TransactionResponse;
    await tx.wait(1);   // 1 confirmation

    const explorerUrl = `https://amoy.polygonscan.com/tx/${tx.hash}`;
    console.log(`[Blockchain] ✅ Secured on-chain — tx: ${tx.hash}`);
    console.log(`[Blockchain]    Explorer: ${explorerUrl}`);

    return { fileHash, txHash: tx.hash, explorerUrl };
  } catch (err) {
    console.error('[Blockchain] silentlyRecordHash failed:', err);
    return null;
  }
}

/**
 * verifyRecordHash
 * ─────────────────
 * Re-hash the data and call verifyRecord() on the contract (read-only, no gas).
 * Returns structured verification metadata for the UI badge / tooltip.
 *
 * NEVER throws — on any error it returns { verified: false, ... }.
 */
export async function verifyRecordHash(data: unknown): Promise<VerifyResult> {
  const notFound: VerifyResult = {
    verified: false,
    timestamp: 0,
    blockNumber: 0,
    anchoredAt: null,
    explorerUrl: null,
  };

  try {
    const provider = getProvider();
    const contract = getReadContract(provider);
    const fileHash = hashData(data);

    const [timestamp, blockNumber]: [bigint, bigint] =
      await contract.getRecordDetails(fileHash);

    const ts = Number(timestamp);
    if (ts === 0) return notFound;

    const anchoredAt = new Date(ts * 1000).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    return {
      verified: true,
      timestamp: ts,
      blockNumber: Number(blockNumber),
      anchoredAt,
      explorerUrl: `https://amoy.polygonscan.com/block/${Number(blockNumber)}`,
    };
  } catch (err) {
    console.error('[Blockchain] verifyRecordHash failed:', err);
    return notFound;
  }
}

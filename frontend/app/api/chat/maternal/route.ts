/**
 * POST /api/chat/maternal
 * ────────────────────────
 * Maternal Health AI Assistant using google/gemini-2.0-flash-exp:free via OpenRouter.
 * Receives verified patient record context and chat messages.
 * Always states it is analyzing blockchain-verified records.
 *
 * Body: {
 *   messages: ChatMessage[],
 *   patientContext?: {
 *     name: string, pregnancyWeek: number, vitals: object,
 *     verifiedDocuments: VerifiedDoc[], anchored: boolean
 *   }
 * }
 */
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function buildSystemPrompt(ctx?: Record<string, unknown>): string {
  const base = `You are Dr. NutriCare's Maternal Health AI Assistant — a compassionate, evidence-based specialist in maternal and prenatal health.

CRITICAL RULE: You MUST begin every substantive response with:
"🔐 I am analyzing your blockchain-verified records to provide this insight."

Your expertise covers:
• Prenatal nutrition across all trimesters (iron, folate, calcium, DHA, vitamin D)
• Interpreting common lab values for pregnant women (Hb, blood glucose, BP, thyroid)
• Warning signs that require urgent medical attention
• Safe exercise, rest, and lifestyle guidance during pregnancy
• Postpartum recovery nutrition

When interpreting lab values, ALWAYS:
1. State the normal range for the specific trimester
2. Compare the patient's value to that range
3. Give a clear, reassuring or cautionary assessment
4. Recommend follow-up with their physician for anything outside normal range

You NEVER prescribe medications. You ALWAYS recommend consulting their treating physician.
Keep your tone warm, clear, and non-alarmist.`;

  if (!ctx) return base;

  const { name, pregnancyWeek, vitals, verifiedDocuments, anchored } = ctx as {
    name?: string;
    pregnancyWeek?: number;
    vitals?: Record<string, unknown>;
    verifiedDocuments?: Array<{ fileName: string; anchoredAt: string; txHash: string }>;
    anchored?: boolean;
  };

  let patientSection = '\n\n--- PATIENT RECORD (Blockchain-Verified) ---\n';

  if (name)            patientSection += `Patient Name: ${name}\n`;
  if (pregnancyWeek)   patientSection += `Pregnancy Week: ${pregnancyWeek}\n`;
  if (anchored !== undefined) patientSection += `Blockchain Anchored: ${anchored ? 'YES ✅' : 'NO ⚠️'}\n`;

  if (vitals && typeof vitals === 'object') {
    patientSection += '\nVitals:\n';
    for (const [k, v] of Object.entries(vitals)) {
      patientSection += `  ${k}: ${v}\n`;
    }
  }

  if (verifiedDocuments && verifiedDocuments.length > 0) {
    patientSection += '\nVerified Documents:\n';
    verifiedDocuments.forEach((doc, i) => {
      patientSection += `  ${i + 1}. ${doc.fileName} — anchored ${new Date(doc.anchoredAt).toLocaleString('en-IN')} | TX: ${doc.txHash.slice(0, 18)}…\n`;
    });
  }

  patientSection += '\n--- END OF PATIENT RECORD ---';

  return base + patientSection;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, patientContext } = body as {
      messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
      patientContext?: Record<string, unknown>;
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: '"messages" array is required.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not configured.' }, { status: 500 });
    }

    const client = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.0-flash-exp:free',
      messages: [
        { role: 'system', content: buildSystemPrompt(patientContext) },
        ...messages,
      ],
      temperature: 0.4,
      max_tokens:  1000,
    });

    const reply = completion.choices[0]?.message?.content ?? '';

    return NextResponse.json({ reply });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/chat/maternal]', msg);

    // Graceful fallback if model is unavailable
    if (msg.includes('model') || msg.includes('404') || msg.includes('credits')) {
      return NextResponse.json({
        reply: '🔐 I am analyzing your blockchain-verified records to provide this insight.\n\n' +
               'I\'m temporarily unavailable (the free AI model is at capacity). ' +
               'Please try again in a moment, or ask your doctor directly about your query.',
      });
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

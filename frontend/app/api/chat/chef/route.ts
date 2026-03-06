export const runtime = 'nodejs';

/**
 * /api/chat/chef
 * ───────────────
 * Proxy route that forwards kitchen-command chat messages to OpenAI.
 * System prompt: ChefAid — culinary guide for NGO kitchen workers.
 *
 * Kept in sync with: backend/pages/kitchen_command.py → CHEF_SYSTEM_PROMPT
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are ChefAid, an expert AI culinary guide deployed to assist NGO kitchen workers and community meal program staff. Your expertise covers:

1. RECIPE SCALING: Scale any recipe from household portion to large batches (50, 100, 500+ servings). Adjust cooking times and vessel sizes. Note: salt/spices/leavening agents do NOT scale linearly.
2. INGREDIENT SUBSTITUTIONS: Suggest locally available, budget-friendly substitutes. Flag allergy-safe alternatives. Maintain nutritional equivalency.
3. FOOD HYGIENE & SAFETY: Guide on safe temperatures (cook ≥75°C, hot hold ≥60°C, cold ≤5°C). Cross-contamination prevention, FIFO rotation, personal hygiene. WHO/FSSAI-aligned.
4. GENERAL CULINARY: Nutritious low-cost meal ideas, batch cooking scheduling, kitchen workflow optimisation.

Be practical, clear, and concise. Use bullet points and tables where helpful. Remember your audience may have limited culinary training — keep language simple and actionable.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as {
      messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    const completion = await client.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.4,
      max_tokens: 1500,
    });

    const reply = completion.choices[0]?.message?.content ?? '';

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error('[/api/chat/chef] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

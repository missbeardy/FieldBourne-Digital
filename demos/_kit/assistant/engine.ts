import type { AssistantPack, AssistantState, ReplyResult } from './types.ts'

export const initialState: AssistantState = { turns: 0, asked: [], leadShown: false }

const STOP = new Set([
  'a', 'an', 'the', 'is', 'are', 'do', 'does', 'you', 'your', 'i', 'my', 'me', 'we', 'can', 'to',
  'of', 'for', 'and', 'or', 'in', 'on', 'it', 'be', 'how', 'what', 'about', 'with', 'at', 'have',
])

export function normalise(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t))
}

function stem(t: string): string {
  return t.length > 3 && t.endsWith('s') ? t.slice(0, -1) : t
}

/** Deterministic 600 to 1200 ms delay derived from the message text. */
function delayFor(message: string): number {
  let h = 0
  for (let i = 0; i < message.length; i++) h = (h * 31 + message.charCodeAt(i)) >>> 0
  return 600 + (h % 601)
}

function score(tokens: string[], keywords: string[]): number {
  const stems = tokens.map(stem)
  const msg = new Set(stems)
  const joined = ' ' + stems.join(' ') + ' '
  let s = 0
  for (const kw of keywords) {
    const parts = normalise(kw).map(stem)
    if (parts.length === 0) continue
    if (parts.length === 1) {
      if (msg.has(parts[0])) s += 1
    } else if (joined.includes(' ' + parts.join(' ') + ' ')) {
      s += parts.length + 1
    } else if (parts.every((p) => msg.has(p))) {
      s += parts.length
    }
  }
  return s
}

export function reply(pack: AssistantPack, message: string, state: AssistantState): ReplyResult {
  const tokens = normalise(message)
  let best: { id: string; answer: string; startLead: boolean; score: number } | null = null
  for (const intent of pack.intents) {
    const s = score(tokens, intent.keywords)
    if (s > 0 && (!best || s > best.score)) {
      best = { id: intent.id, answer: intent.answer, startLead: !!intent.startLead, score: s }
    }
  }
  const turns = state.turns + 1
  if (!best) {
    return {
      text: pack.fallback,
      delayMs: delayFor(message),
      state: { ...state, turns, leadShown: true },
      showLeadForm: true,
    }
  }
  return {
    text: best.answer,
    delayMs: delayFor(message),
    state: {
      turns,
      asked: [...state.asked, best.id],
      leadShown: state.leadShown || best.startLead,
    },
    showLeadForm: best.startLead,
  }
}

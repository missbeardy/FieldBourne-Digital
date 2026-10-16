/** Selector contract: every demo must put these attributes on the matching elements. */
export const DEMO_CHAT_OPEN = 'data-demo-chat-open'
export const DEMO_CHIP = 'data-demo-chip'
export const DEMO_CHAT_INPUT = 'data-demo-chat-input'
export const DEMO_CHAT_SEND = 'data-demo-chat-send'
export const DEMO_REPLY = 'data-demo-reply'
export const DEMO_LEAD_FIELD = 'data-demo-lead-field'
export const DEMO_LEAD_SUBMIT = 'data-demo-lead-submit'
export const DEMO_RIBBON = 'data-demo-ribbon'

export const SELECTORS = {
  chatOpen: DEMO_CHAT_OPEN,
  chip: DEMO_CHIP,
  chatInput: DEMO_CHAT_INPUT,
  chatSend: DEMO_CHAT_SEND,
  reply: DEMO_REPLY,
  leadField: DEMO_LEAD_FIELD,
  leadSubmit: DEMO_LEAD_SUBMIT,
  ribbon: DEMO_RIBBON,
} as const

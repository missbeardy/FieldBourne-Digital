export interface Intent {
  id: string
  keywords: string[]
  answer: string
  startLead?: boolean
}

export interface LeadField {
  id: string
  label: string
  type: string
  required: boolean
}

export interface AssistantPack {
  business: { name: string; ownerFirstName: string; area: string }
  /** Exactly three suggested opening questions. */
  chips: [string, string, string]
  intents: Intent[]
  fallback: string
  lead: { fields: LeadField[]; confirmation: string }
  /** Exactly three questions used by the judge walkthrough. */
  judgeQuestions: [string, string, string]
}

export interface AssistantState {
  /** Number of messages handled so far. */
  turns: number
  /** Intent ids already answered, in order. */
  asked: string[]
  /** True once the lead form has been shown. */
  leadShown: boolean
}

export interface ReplyResult {
  text: string
  /** Simulated typing delay, 600 to 1200 ms. */
  delayMs: number
  state: AssistantState
  showLeadForm: boolean
}

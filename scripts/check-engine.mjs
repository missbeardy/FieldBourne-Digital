// Self-check for the demo assistant engine. Run: node scripts/check-engine.mjs
// Needs Node 22.6+ (native type stripping, enabled by default from 22.18 / 23.6).
const { reply, initialState } = await import('../demos/_kit/assistant/engine.ts')

const pack = {
  business: { name: 'Test Co', ownerFirstName: 'Sam', area: 'Brisbane' },
  chips: ['a', 'b', 'c'],
  intents: [
    { id: 'hours', keywords: ['hours', 'open', 'opening hours'], answer: 'We are open 7 to 5.' },
    { id: 'price', keywords: ['price', 'cost', 'how much'], answer: 'Quotes are free.' },
    { id: 'book', keywords: ['book', 'booking'], answer: 'Happy to book you in.', startLead: true },
  ],
  fallback: 'Not sure about that one. Leave your details and Sam will call.',
  lead: { fields: [{ id: 'name', label: 'Name', type: 'text', required: true }], confirmation: 'Thanks.' },
  judgeQuestions: ['x', 'y', 'z'],
}

const cases = [
  ['keyword match', () => reply(pack, 'What are your opening hours?', initialState), (r) => r.text === 'We are open 7 to 5.' && !r.showLeadForm],
  ['plural/stem match', () => reply(pack, 'what does it cost', initialState), (r) => r.text === 'Quotes are free.'],
  ['startLead intent shows form', () => reply(pack, 'Can I book a visit?', initialState), (r) => r.showLeadForm && r.state.leadShown],
  ['no match gives fallback then form', () => reply(pack, 'purple elephants', initialState), (r) => r.text === pack.fallback && r.showLeadForm],
  ['delay in range and state advances', () => reply(pack, 'price?', initialState), (r) => r.delayMs >= 600 && r.delayMs <= 1200 && r.state.turns === 1 && r.state.asked[0] === 'price'],
]

let failed = 0
for (const [name, run, ok] of cases) {
  let pass = false
  try {
    pass = ok(run())
  } catch (e) {
    console.error(e)
  }
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}`)
  if (!pass) failed++
}
if (failed) {
  console.error(`${failed} case(s) failed`)
  process.exit(1)
}
console.log('engine ok')

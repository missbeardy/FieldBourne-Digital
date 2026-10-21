import { DEMO_RIBBON } from './selectors.ts'

export function DemoRibbon({ className, name }: { className?: string; name: string }) {
  const marker = { [DEMO_RIBBON]: '' }
  return (
    <div className={className} {...marker}>
      <span>Concept site. {name} is an invented business, built by FieldBourne Digital.</span>{' '}
      <a href="/work">See all concept sites</a>
    </div>
  )
}

export default DemoRibbon

import { DEMO_RIBBON } from './selectors.ts'

export function DemoRibbon({ className }: { className?: string }) {
  const marker = { [DEMO_RIBBON]: '' }
  return (
    <div className={className} {...marker}>
      <span>Demo site. A fictional business built by FieldBourne Digital.</span>{' '}
      <a href="/work">See more of our work</a>
    </div>
  )
}

export default DemoRibbon

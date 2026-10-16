/** ACMA-reserved fictional numbers. Never use real contact details in demos. */

/** Mobiles 0491 570 156 to 0491 570 159. */
export const fakeMobiles: string[] = [156, 157, 158, 159].map((n) => `0491 570 ${n}`)

/** Landlines (07) 5550 0100 to (07) 5550 0199. */
export function fakeLandline(index: number): string {
  const n = 100 + (((index % 100) + 100) % 100)
  return `(07) 5550 ${String(n).padStart(4, '0')}`
}

export const fakeLandlines: string[] = Array.from({ length: 100 }, (_, i) => fakeLandline(i))

export function fakeEmail(localPart: string): string {
  return `${localPart.toLowerCase().replace(/[^a-z0-9.]+/g, '.')}@example.com`
}

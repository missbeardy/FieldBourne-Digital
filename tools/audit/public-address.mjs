// Checks that a website address from the review form points at a public website, not at a
// machine on Darren's own network (his router, his computer, a cloud metadata address).
// The audit browses whatever address it is given, from Darren's machine, so anything that
// isn't a plain public website is refused before it is opened.
//
// Used by tools/audit/audit.mjs and .claude/skills/free-review-queue/scripts/queue.mjs.

import { lookup } from 'node:dns/promises'
import { BlockList, isIP } from 'node:net'

const privateRanges = new BlockList()
for (const [net, bits] of [
  ['0.0.0.0', 8], // "this network"
  ['10.0.0.0', 8], // private
  ['100.64.0.0', 10], // carrier-grade NAT
  ['127.0.0.0', 8], // loopback
  ['169.254.0.0', 16], // link-local, includes cloud metadata 169.254.169.254
  ['172.16.0.0', 12], // private
  ['192.0.0.0', 24], // protocol assignments
  ['192.168.0.0', 16], // private, most home routers
  ['198.18.0.0', 15], // benchmarking
  ['224.0.0.0', 4], // multicast
  ['240.0.0.0', 4], // reserved and broadcast
]) privateRanges.addSubnet(net, bits, 'ipv4')
for (const [net, bits] of [
  ['::', 128], // unspecified
  ['::1', 128], // loopback
  ['fc00::', 7], // unique local
  ['fe80::', 10], // link-local
  ['ff00::', 8], // multicast
]) privateRanges.addSubnet(net, bits, 'ipv6')

/** True when an IP address is loopback, private, link-local, CGNAT or otherwise not on the public internet. */
export function isPrivateIp(ip) {
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i)
  if (mapped) return isPrivateIp(mapped[1])
  const family = isIP(ip)
  if (!family) return true
  return privateRanges.check(ip, family === 4 ? 'ipv4' : 'ipv6')
}

/**
 * Returns why an address isn't a public website, or '' when it is fine to open.
 * An address that doesn't resolve at all also returns '': the audit's own reachability
 * check reports dead or mistyped addresses in plain words.
 */
export async function notPublicReason(address) {
  let u
  try {
    u = new URL(address)
  } catch {
    return 'not a valid website address'
  }
  if (!['http:', 'https:'].includes(u.protocol)) return 'only http and https addresses are checked'
  if (u.username || u.password) return 'the address has a login in it'
  if (u.port && !['80', '443'].includes(u.port)) return `the address uses an unusual port (${u.port})`
  const hostname = u.hostname.replace(/^\[|\]$/g, '').toLowerCase()
  if (isIP(hostname)) return 'the address is a bare IP number, not a website name'
  if (!hostname.includes('.') || /\.(localhost|local|internal|lan|home|arpa)$/.test(hostname) || hostname === 'localhost') {
    return 'the address points at a local network name'
  }
  let addresses
  try {
    addresses = await lookup(hostname, { all: true, verbatim: true })
  } catch {
    return ''
  }
  const inside = addresses.find((a) => isPrivateIp(a.address))
  return inside ? `the address points inside a private network (${inside.address})` : ''
}

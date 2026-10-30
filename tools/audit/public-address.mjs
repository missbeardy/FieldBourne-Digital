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
  ['100::', 64], // discard
  ['fc00::', 7], // unique local
  ['fe80::', 10], // link-local
  ['fec0::', 10], // old site-local
  ['ff00::', 8], // multicast
]) privateRanges.addSubnet(net, bits, 'ipv6')

// IPv6 forms that carry an IPv4 address inside them: [prefix, bits, where the IPv4 sits in the 128 bits]
const embedsIpv4 = [
  ['::', 96, 96], // IPv4-compatible ::a.b.c.d
  ['::ffff:0:0', 96, 96], // IPv4-mapped ::ffff:a.b.c.d
  ['64:ff9b::', 96, 96], // NAT64
  ['64:ff9b:1::', 48, 96], // local NAT64
  ['2002::', 16, 16], // 6to4
].map(([net, bits, at]) => {
  const list = new BlockList()
  list.addSubnet(net, bits, 'ipv6')
  return { list, at }
})

// Expands an IPv6 address to a 128-bit BigInt
function ipv6ToBigInt(ip) {
  let s = ip.toLowerCase()
  const v4 = s.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
  if (v4) s = s.slice(0, -v4[0].length) + ((+v4[1] << 8) | +v4[2]).toString(16) + ':' + ((+v4[3] << 8) | +v4[4]).toString(16)
  const [head, tail = ''] = s.split('::')
  const h = head ? head.split(':') : []
  const t = tail ? tail.split(':') : []
  const groups = s.includes('::') ? [...h, ...Array(8 - h.length - t.length).fill('0'), ...t] : h
  return groups.reduce((n, g) => (n << 16n) | BigInt(parseInt(g || '0', 16)), 0n)
}

/** True when an IP address is loopback, private, link-local, CGNAT or otherwise not on the public internet. */
export function isPrivateIp(ip) {
  const family = isIP(ip)
  if (!family) return true
  if (family === 4) return privateRanges.check(ip, 'ipv4')
  if (privateRanges.check(ip, 'ipv6')) return true
  // Check any IPv4 address carried inside the IPv6 one against the IPv4 list
  for (const { list, at } of embedsIpv4) {
    if (!list.check(ip, 'ipv6')) continue
    const n = Number((ipv6ToBigInt(ip) >> BigInt(128 - at - 32)) & 0xffffffffn)
    if (isPrivateIp([n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'))) return true
  }
  return false
}

/**
 * Returns why an address isn't a public website, or '' when it is fine to open.
 * An address that doesn't resolve at all also returns '': the audit's own reachability
 * check reports dead or mistyped addresses in plain words. Inside the audit browser, pass
 * blockUnresolved so a name that can't be checked is never opened.
 */
export async function notPublicReason(address, { blockUnresolved = false } = {}) {
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
    return blockUnresolved ? 'the address could not be looked up' : ''
  }
  const inside = addresses.find((a) => isPrivateIp(a.address))
  return inside ? `the address points inside a private network (${inside.address})` : ''
}

// NFR-02: client IPs stored/logged in masked form (last octet / hextet hidden).
export function maskIp(ip: string): string {
  const normalized = ip.replace(/^::ffff:/, "");
  if (normalized.includes(":")) {
    const segments = normalized.split(":");
    const head = segments.slice(0, -1).join(":");
    return `${head}:****`;
  }
  const octets = normalized.split(".");
  const [a = "0", b = "0", c = "0"] = octets;
  return `${a}.${b}.${c}.*`;
}
const expected = 26;
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2026 target / Node.js 26",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));

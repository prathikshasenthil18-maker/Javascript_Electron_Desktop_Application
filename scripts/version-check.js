const expected = 24;
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2025 target / Node.js 24",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));

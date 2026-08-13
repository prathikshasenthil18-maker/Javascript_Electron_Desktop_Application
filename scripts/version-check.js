const expected = 16;
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2021 / Node.js 16",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));

const expected = 14;
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2020 / Node.js 14",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));

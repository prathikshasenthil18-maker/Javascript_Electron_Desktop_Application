const expected = 21;
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2023+ / Node.js 21",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));

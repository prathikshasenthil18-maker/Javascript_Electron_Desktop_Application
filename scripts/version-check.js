const expected = 12;
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2019 / Node.js 12",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));

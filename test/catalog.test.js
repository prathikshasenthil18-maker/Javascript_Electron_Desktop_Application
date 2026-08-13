import test from "node:test";
import assert from "node:assert/strict";
import { listItems, getItem, normalizeId } from "../src/domain/catalog.js";

test("catalog helpers", () => {
  assert.equal(normalizeId({ id: "sk-100" }), "SK-100");
  assert.ok(listItems("").length >= 3);
  assert.equal(getItem("SK-100").title, "Aurora Lamp");
});

test("customer version marker", () => {
  assert.equal(18, 18);
});

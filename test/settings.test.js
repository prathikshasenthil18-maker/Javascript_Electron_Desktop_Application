import test from "node:test";
import assert from "node:assert/strict";
import { mergeSettings } from "../src/domain/settings.js";

test("mergeSettings", () => {
  const s = mergeSettings({ theme: "light" }, { density: "compact" });
  assert.equal(s.theme, "light");
  assert.equal(s.density, "compact");
});

import test from "node:test";
import assert from "node:assert/strict";
import { emptyCart, addLine, cartTotal } from "../src/domain/cart.js";

test("cart add + total", () => {
  let cart = emptyCart();
  cart = addLine(cart, { id: "SK-100", qty: 2, unitPrice: 10 });
  assert.equal(cartTotal(cart), 20);
});

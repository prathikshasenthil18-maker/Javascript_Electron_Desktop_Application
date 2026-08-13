export function emptyCart() { return { lines: [] }; }

export function addLine(cart, line) {
  cart = cart || emptyCart();
  line = line || {};
  var id = String(line.id || "");
  var qty = Number(line.qty != null ? line.qty : 1);
  if (!id || !(qty > 0)) throw new Error("cart_line_invalid");
  var lines = (cart.lines || []).slice();
  var found = -1;
  for (var i = 0; i < lines.length; i += 1) {
    if (lines[i].id === id) { found = i; break; }
  }
  if (found >= 0) lines[found] = Object.assign({}, lines[found], { qty: lines[found].qty + qty });
  else lines.push({ id: id, qty: qty, unitPrice: Number(line.unitPrice || 0) });
  return { lines: lines };
}

export function cartTotal(cart) {
  var lines = (cart && cart.lines) || [];
  var sum = 0;
  for (var i = 0; i < lines.length; i += 1) sum += Number(lines[i].qty) * Number(lines[i].unitPrice);
  return Math.round(sum * 100) / 100;
}

export function emptyCart() { return { lines: [] }; }

export function addLine(cart, line) {
  const base = cart ?? emptyCart();
  const id = String(line?.id ?? "");
  const qty = Number(line?.qty ?? 1);
  if (!id || !(qty > 0)) throw new Error("cart_line_invalid");
  const lines = [...(base.lines ?? [])];
  const idx = lines.findIndex((x) => x.id === id);
  if (idx >= 0) lines[idx] = { ...lines[idx], qty: lines[idx].qty + qty };
  else lines.push({ id, qty, unitPrice: Number(line?.unitPrice ?? 0) });
  return { lines };
}

export function cartTotal(cart) {
  return Math.round(
    (cart?.lines ?? []).reduce((s, x) => s + Number(x.qty) * Number(x.unitPrice), 0) * 100
  ) / 100;
}

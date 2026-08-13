export function emptyCart() { return { lines: [] }; }

export function addLine(cart, line) {
  const base = cart ?? emptyCart();
  if (!Object.hasOwn(line ?? {}, "id")) throw new Error("cart_line_invalid", { cause: { line } });
  const id = String(line.id);
  const qty = Number(line?.qty ?? 1);
  if (!(qty > 0)) throw new Error("cart_line_invalid", { cause: { qty } });
  let lines = [...(base.lines ?? [])];
  const idx = lines.findIndex((x) => x.id === id);
  if (idx >= 0) {
    const cur = lines.at(idx);
    lines = lines.with(idx, { ...cur, qty: cur.qty + qty });
  } else {
    lines = [...lines, { id, qty, unitPrice: Number(line?.unitPrice ?? 0) }];
  }
  return { lines };
}

export function cartTotal(cart) {
  const lines = (cart?.lines ?? []).toSorted((a, b) => String(a.id).localeCompare(String(b.id)));
  return Math.round(lines.reduce((s, x) => s + Number(x.qty) * Number(x.unitPrice), 0) * 100) / 100;
}

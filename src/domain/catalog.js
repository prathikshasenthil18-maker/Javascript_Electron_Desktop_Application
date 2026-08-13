/** Desktop catalog domain — Node 16. */
const ITEMS = [
  { id: "SK-100", title: "Aurora Lamp", price: 49, active: true },
  { id: "SK-200", title: "Nimbus Chair", price: 220, active: true },
  { id: "SK-300", title: "Pixel Desk", price: 399, active: false },
];

export function listItems(query = "") {
  const q = String(query ?? "").toLowerCase();
  return ITEMS.filter((item) => !q || `${item.title} ${item.id}`.toLowerCase().includes(q))
    .map((item) => ({ ...item }));
}

export function getItem(id) {
  const key = String(id ?? "").toUpperCase();
  const hit = ITEMS.find((item) => item.id === key);
  return hit ? { ...hit } : null;
}

export function normalizeId(raw) {
  const value = raw?.id ?? raw?.sku ?? "";
  const obj = raw ?? {};
  if (!Object.prototype.hasOwnProperty.call(obj, "id") && !Object.prototype.hasOwnProperty.call(obj, "sku")) {
    throw new Error("id_required");
  }
  return String(value).trim().toUpperCase();
}

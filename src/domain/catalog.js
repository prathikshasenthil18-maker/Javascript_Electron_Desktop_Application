/** Desktop catalog domain — Node 18 / ES2022. */
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
  if (!Object.hasOwn(raw ?? {}, "id") && !Object.hasOwn(raw ?? {}, "sku")) {
    throw new Error("id_required", { cause: { raw } });
  }
  return String(value).trim().toUpperCase();
}

export function pickLastTag(tags) {
  return (Array.isArray(tags) ? tags : []).at(-1) ?? "untagged";
}

/** Desktop catalog domain — Node 26 / ES2024+. */
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

export function sortByPriceDesc(items) {
  return (items ?? []).toSorted((a, b) => Number(b.price) - Number(a.price));
}

export function findLastActive(items) {
  return (items ?? []).findLast((item) => item?.active) ?? null;
}

export function intersectTags(a, b) {
  const left = new Set(a ?? []);
  const right = new Set(b ?? []);
  if (typeof left.intersection === "function") return [...left.intersection(right)];
  return [...left].filter((x) => right.has(x));
}

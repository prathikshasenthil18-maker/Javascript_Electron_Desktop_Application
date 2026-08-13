/** Desktop catalog domain — Node 12 / ES2019. */
var ITEMS = [
  { id: "SK-100", title: "Aurora Lamp", price: 49, active: true },
  { id: "SK-200", title: "Nimbus Chair", price: 220, active: true },
  { id: "SK-300", title: "Pixel Desk", price: 399, active: false },
];

export function listItems(query) {
  query = String(query || "").toLowerCase();
  return ITEMS.filter(function (item) {
    if (!query) return true;
    return (item.title + " " + item.id).toLowerCase().indexOf(query) >= 0;
  }).map(function (item) {
    return Object.assign({}, item);
  });
}

export function getItem(id) {
  id = String(id || "").toUpperCase();
  for (var i = 0; i < ITEMS.length; i += 1) {
    if (ITEMS[i].id === id) return Object.assign({}, ITEMS[i]);
  }
  return null;
}

export function normalizeId(raw) {
  raw = raw || {};
  var value = raw.id != null ? raw.id : raw.sku;
  if (value == null || value === "") throw new Error("id_required");
  return String(value).trim().toUpperCase();
}

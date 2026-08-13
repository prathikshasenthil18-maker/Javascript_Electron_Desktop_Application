export function defaultSettings() {
  return { theme: "dark", density: "comfortable", notifications: true };
}

export function mergeSettings(base, patch) {
  return Object.assign({}, defaultSettings(), base || {}, patch || {});
}

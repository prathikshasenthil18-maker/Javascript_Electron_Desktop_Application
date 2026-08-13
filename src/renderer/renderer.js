async function boot() {
  const api = window.desktopApi;
  const info = await api.appInfo();
  const items = await api.listItems("");
  document.getElementById("title").textContent = info.application;
  document.getElementById("meta").textContent =
    `${info.branch} · CV ${info.customer_version} · ${info.syntax}`;
  const list = document.getElementById("items");
  list.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = `${item.id} — ${item.title} ($${item.price})`;
    list.appendChild(li);
  }
  if (items[0]) {
    await api.addToCart({ id: items[0].id, qty: 1, unitPrice: items[0].price });
  }
  const total = await api.cartTotal();
  document.getElementById("cart").textContent = `Cart total: $${total}`;
}

boot();

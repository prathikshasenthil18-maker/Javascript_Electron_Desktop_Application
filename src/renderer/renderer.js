async function boot() {
  var api = window.desktopApi;
  var info = await api.appInfo();
  var items = await api.listItems("");
  document.getElementById("title").textContent = info.application;
  document.getElementById("meta").textContent =
    info.branch + " · CV " + info.customer_version + " · " + info.syntax;
  var list = document.getElementById("items");
  list.innerHTML = "";
  for (var i = 0; i < items.length; i += 1) {
    var li = document.createElement("li");
    li.textContent = items[i].id + " — " + items[i].title + " ($" + items[i].price + ")";
    list.appendChild(li);
  }
  if (items.length) {
    await api.addToCart({ id: items[0].id, qty: 1, unitPrice: items[0].price });
  }
  var total = await api.cartTotal();
  document.getElementById("cart").textContent = "Cart total: $" + total;
}

boot();

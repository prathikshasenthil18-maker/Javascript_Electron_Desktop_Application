import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listItems, getItem } from "../domain/catalog.js";
import { emptyCart, addLine, cartTotal } from "../domain/cart.js";
import { mergeSettings, defaultSettings } from "../domain/settings.js";
import { IPC } from "../lib/ipc-channels.js";
import { APPLICATION, BRANCH, CUSTOMER_VERSION, SYNTAX_LABEL } from "../version.js";

var __dirname = path.dirname(fileURLToPath(import.meta.url));
var cart = emptyCart();
var settings = defaultSettings();

function createWindow() {
  var win = new BrowserWindow({
    width: 960,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

function registerIpc() {
  ipcMain.handle(IPC.APP_INFO, function () {
    return {
      application: APPLICATION,
      branch: BRANCH,
      customer_version: CUSTOMER_VERSION,
      syntax: SYNTAX_LABEL,
    };
  });
  ipcMain.handle(IPC.LIST_ITEMS, function (_e, query) {
    return listItems(query);
  });
  ipcMain.handle(IPC.GET_ITEM, function (_e, id) {
    return getItem(id);
  });
  ipcMain.handle(IPC.ADD_TO_CART, function (_e, line) {
    cart = addLine(cart, line);
    return cart;
  });
  ipcMain.handle(IPC.CART_TOTAL, function () {
    return cartTotal(cart);
  });
  ipcMain.handle(IPC.GET_SETTINGS, function () {
    return mergeSettings(settings, {});
  });
}

app.whenReady().then(function () {
  registerIpc();
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

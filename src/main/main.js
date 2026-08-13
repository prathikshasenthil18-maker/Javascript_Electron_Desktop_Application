import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listItems, getItem } from "../domain/catalog.js";
import { emptyCart, addLine, cartTotal } from "../domain/cart.js";
import { mergeSettings, defaultSettings } from "../domain/settings.js";
import { IPC } from "../lib/ipc-channels.js";
import { APPLICATION, BRANCH, CUSTOMER_VERSION, SYNTAX_LABEL } from "../version.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let cart = emptyCart();
let settings = defaultSettings();

function createWindow() {
  const win = new BrowserWindow({
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
  ipcMain.handle(IPC.APP_INFO, () => ({
    application: APPLICATION,
    branch: BRANCH,
    customer_version: CUSTOMER_VERSION,
    syntax: SYNTAX_LABEL,
  }));
  ipcMain.handle(IPC.LIST_ITEMS, (_e, query) => listItems(query));
  ipcMain.handle(IPC.GET_ITEM, (_e, id) => getItem(id));
  ipcMain.handle(IPC.ADD_TO_CART, (_e, line) => {
    cart = addLine(cart, line);
    return cart;
  });
  ipcMain.handle(IPC.CART_TOTAL, () => cartTotal(cart));
  ipcMain.handle(IPC.GET_SETTINGS, () => mergeSettings(settings, {}));
}

app.whenReady().then(() => {
  registerIpc();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

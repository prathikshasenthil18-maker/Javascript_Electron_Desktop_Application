import { contextBridge, ipcRenderer } from "electron";
import { IPC } from "../lib/ipc-channels.js";

contextBridge.exposeInMainWorld("desktopApi", {
  appInfo: function () { return ipcRenderer.invoke(IPC.APP_INFO); },
  listItems: function (q) { return ipcRenderer.invoke(IPC.LIST_ITEMS, q); },
  getItem: function (id) { return ipcRenderer.invoke(IPC.GET_ITEM, id); },
  addToCart: function (line) { return ipcRenderer.invoke(IPC.ADD_TO_CART, line); },
  cartTotal: function () { return ipcRenderer.invoke(IPC.CART_TOTAL); },
  getSettings: function () { return ipcRenderer.invoke(IPC.GET_SETTINGS); },
});

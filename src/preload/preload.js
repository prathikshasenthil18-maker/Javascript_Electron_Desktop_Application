import { contextBridge, ipcRenderer } from "electron";
import { IPC } from "../lib/ipc-channels.js";

contextBridge.exposeInMainWorld("desktopApi", {
  appInfo: () => ipcRenderer.invoke(IPC.APP_INFO),
  listItems: (q) => ipcRenderer.invoke(IPC.LIST_ITEMS, q),
  getItem: (id) => ipcRenderer.invoke(IPC.GET_ITEM, id),
  addToCart: (line) => ipcRenderer.invoke(IPC.ADD_TO_CART, line),
  cartTotal: () => ipcRenderer.invoke(IPC.CART_TOTAL),
  getSettings: () => ipcRenderer.invoke(IPC.GET_SETTINGS),
});

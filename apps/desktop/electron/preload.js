const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  openFolder: () => ipcRenderer.invoke("open-folder"),
  readFile: (path) => ipcRenderer.invoke("read-file", path),
});
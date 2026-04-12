const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(createWindow);

// 📁 Open folder
ipcMain.handle("open-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.canceled) return [];

  const folderPath = result.filePaths[0];

  const files = fs.readdirSync(folderPath);

  return files.map((file) => ({
    name: file,
    path: path.join(folderPath, file),
  }));
});

// 📄 Read file
ipcMain.handle("read-file", async (_, filePath) => {
  return fs.readFileSync(filePath, "utf-8");
});
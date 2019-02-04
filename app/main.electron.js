const { app, autoUpdater, dialog, BrowserWindow } = require('electron')

let mainWindow = null

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
    width: 1024,
    height: 728
  })

  mainWindow.setMenu(null)
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:1212`);
    mainWindow.toggleDevTools()
  } else {
    mainWindow.loadURL(`http://research.anibalsolon.com/cmi/c-pac/gui/electron/${app.getVersion()}`);
  }

  mainWindow.webContents.on("did-fail-load", function() {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(
        () => mainWindow.loadURL(`http://localhost:1212`),
        500
      )
    }
  });

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
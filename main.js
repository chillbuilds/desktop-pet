
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const mouseEvent = require("global-mouse-events")

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  })

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  mainWindow.setAlwaysOnTop(true, 'screen-saver', 1)
  mainWindow.setIgnoreMouseEvents(true, { forward: true })
  mainWindow.setFocusable(false)
  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile('./public/html/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

let mouseListener = () => {
  // mouseEvent.on("mouseup", event => {
  //   console.log(event) // { x: 2962, y: 483, button: 1 }
  // })
  
  // mouseEvent.on("mousedown", event => {
  //   console.log(event) // { x: 2962, y: 483, button: 1 }
  // })
  
  // mouseEvent.on("mousemove", event => {
  //   console.log(event) // { x: 2962, y: 482 }
  // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  mouseListener()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('toMain', (event, data) => {
  if(data == 'hovered'){
    mainWindow.setIgnoreMouseEvents(false)
  }
  if(data == 'left'){
    mainWindow.setIgnoreMouseEvents(true, { forward: true })
  }
  // console.log(data) // Handle the data sent from the renderer process
})
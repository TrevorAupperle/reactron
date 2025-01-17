import { app, BrowserWindow } from 'electron'
import path from 'path'
import { isDev, getPreloadPath, ipcMainHandle, getUIPath } from './util.js'

/**
 * On app ready, create the main window.
 */
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: getPreloadPath()
        }
    })
    if (isDev()) {
        mainWindow.loadURL(`http://localhost:3000`)
    } else {
        mainWindow.loadFile(getUIPath())
    }

    ipcMainHandle('test', () => 'test')

    mainWindow.on('closed', () => {
        app.quit()
    })
})

/**
 * On all windows closed, quit the app.
 */
app.on('window-all-closed', () => {
    app.quit()
})

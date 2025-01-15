import { app, BrowserWindow } from 'electron'
import path from 'path'
import { isDev } from './util.js'

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
    })
    if (isDev()) {
        mainWindow.loadURL(`http://localhost:3000`)
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), 'dist-app/index.html'))
    }
})

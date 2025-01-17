import { app, ipcMain, WebContents, WebFrameMain } from "electron"
import path from "path"
import { pathToFileURL } from "url"
/**
 * Check if the application is running in development mode.
 * @returns {boolean}
 */
export function isDev(): boolean {
    return process.env.NODE_ENV === 'development'
}

/**
 * Get the path to the preload script.
 * @returns {string}
 */
export function getPreloadPath(): string {
    return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist-electron/preload.cjs')
}

/**
 * Get the path to the UI.
 * @returns {string}
 */
export function getUIPath(): string {
    return path.join(app.getAppPath(), '/dist-app/index.html')
}

/**
 * Get the path to the assets.
 * @returns {string}
 */
export function getAssetPath(): string {
    return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets')
}

/**
 * Handle an IPC event.
 * @param key - The key of the event to handle.
 * @param handler - The handler function to call when the event is received.
 * @example
 * ipcMainHandle('test', (payload) => {
 *     console.log(payload)
 * })
 */
export function ipcMainHandle<Key extends keyof EventPayloadMap>(key: Key, handler: (...args: any[]) => EventPayloadMap[Key]): void {
    ipcMain.handle(key, (event, ...args) => {
        if (!event.senderFrame) return;
        validateEventFrame(event.senderFrame)
        return handler(...args)
    })
}

/**
 * Listen for an IPC event.
 * @param key - The key of the event to listen for.
 * @param listener - The listener function to call when the event is received.
 * @example
 * ipcMainOn('test', (payload) => {
 *     console.log(payload)
 * })
 */
export function ipcMainOn<Key extends keyof EventPayloadMap>(key: Key, listener: (payload: EventPayloadMap[Key]) => void): void {
    ipcMain.on(key, (event, payload) => {
        if (!event.senderFrame) return;
        validateEventFrame(event.senderFrame);
        return listener(payload)
    })
}

/**
 * Send an IPC event.
 * @param key - The key of the event to send.
 * @param webContents - The webContents to send the event to.
 * @param payload - The payload to send.
 * @example
 * ipcRendererSend('test', webContents, 'test')
 */
export function ipcRendererSend<Key extends keyof EventPayloadMap>(key: Key, webContents: WebContents, payload: EventPayloadMap[Key]): void {
    webContents.send(key, payload)
}

/**
 * Validate the event frame.
 * @param frame - The frame to validate.
 * @throws {Error}
 */
export function validateEventFrame(frame: WebFrameMain) {
    // localhost port is set in vite.config.ts
    if (isDev() && new URL(frame.url).host === 'localhost:3000') {
        return;
    }
    // the most basic check to prevent malicious event frames, can be expanded
    // upon if routing becomes more complex
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Malicious event frame detected')
    }
}
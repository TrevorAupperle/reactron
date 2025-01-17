const electron = require('electron')

/**
 * Expose the electron object to the main world.
 */
electron.contextBridge.exposeInMainWorld('electron', {
    isDev: () => {
        return process.env.NODE_ENV === 'development'
    }
} satisfies Window['electron']);

/**
 * Listen for an IPC event.
 * @param key - The key of the event to listen for.
 * @param listener - The listener function to call when the event is received.
 * @returns {Unsubscribe} - A function to unsubscribe from the event.
 * @example
 * const unsubscribe = ipcOn('test', (payload) => {
 *     console.log(payload)
 * })
 * unsubscribe()
 */
export function ipcOn<Key extends keyof EventPayloadMap>(key: Key, listener: (payload: EventPayloadMap[Key]) => void): Unsubscribe {
    const cb = (_: Electron.IpcRendererEvent, payload: any) => listener(payload)
    electron.ipcRenderer.on(key, cb)
    return () => electron.ipcRenderer.off(key, cb)
}

/**
 * Invoke an IPC event.
 * @param key - The key of the event to invoke.
 * @returns {Promise<EventPayloadMap[Key]>}
 * @example
 * const result = await ipcInvoke('test')
 * console.log(result)
 */
export function ipcInvoke<Key extends keyof EventPayloadMap>(key: Key): Promise<EventPayloadMap[Key]> {
    return electron.ipcRenderer.invoke(key)
}
/**
 * A map of event payloads for IPC events.
 */
type EventPayloadMap = {
    test: string
}

/**
 * A function that unsubscribes from an event.
 */
type Unsubscribe = () => void

/**
 * The global window object.
 */
interface Window {
    /**
     * Electron specific methods, properties, and events.
     */
    electron: {
        /**
         * Whether the application is running in development mode.
         * @returns {boolean}
         */
        isDev: () => boolean
    }

    // add other ipc events here...
}
# Reactron

**Electron w/ React + Vite + TypeScript**

A modern desktop application template that combines Electron for desktop capabilities, React for UI development, Vite for build tooling, and TypeScript for type safety. This template provides a production-ready foundation for building cross-platform desktop applications.

## Architecture Overview

This project integrates several modern web technologies:

- **Electron**: A framework for building cross-platform desktop applications using web technologies. It combines Chromium for the frontend and Node.js for the backend, allowing the application to access native operating system features while maintaining a web-based UI.

- **React**: A JavaScript library for building user interfaces, handling the frontend of the application. React's component-based architecture makes it ideal for creating complex, interactive UIs.

- **Vite**: A modern frontend build tool that significantly improves the development experience. It provides:
  - Lightning-fast hot module replacement (HMR)
  - Out-of-the-box TypeScript support
  - Efficient production builds
  - Native ES modules during development

- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript. It provides:
  - Static typing for both Electron and React code
  - Better IDE support and code intelligence
  - Improved maintainability and scalability
  - Type-safe IPC communication between main and renderer processes

### How They Work Together

1. **Development Mode**:
   - Vite serves the React application on a development server
   - Electron loads this development server in its window
   - TypeScript provides real-time type checking
   - Hot Module Replacement allows for instant UI updates

2. **Production Mode**:
   - Vite builds the React application into optimized static files
   - TypeScript compiles the Electron main process code
   - Electron packages everything into a native application
   - Electron Builder creates platform-specific distributables

## Configuration Files

### Vite Configuration
The `vite.config.ts` configures the development server and build process:
- Base URL set to `./` for relative paths
- Output directory set to `dist-app`
- Development server runs on port 3000
- React plugin enabled for JSX compilation

### Electron Builder
The `electron-builder.json` defines how the application is packaged:
- Builds for Windows (portable + MSI), macOS (DMG), and Linux (AppImage)
- Includes both the Electron backend (`dist-electron`) and React frontend (`dist-app`)
- Configures application ID and build targets per platform

## Available Scripts

### Development
- `npm run dev` - Runs both React and Electron in development mode
- `npm run dev:react` - Starts Vite dev server for React
- `npm run dev:electron` - Compiles and runs Electron with hot reload

### Building
- `npm run build` - Builds both React and Electron code
- `npm run transpile:electron` - Compiles Electron TypeScript code
- `npm run preview` - Preview the built application locally

### Distribution
- `npm run dist:mac` - Creates macOS distribution (ARM64)
- `npm run dist:linux` - Creates Linux distribution (x64)
- `npm run dist:win` - Creates Windows distribution (x64)

### Other
- `npm run lint` - Runs ESLint to check code quality

## Development Mode

In development, the application runs with:
- React dev server on port 3000 with HMR
- Electron loading content from `localhost:3000`
- TypeScript compilation in watch mode

## Production Build

The production build process:
1. Compiles Electron TypeScript code to `dist-electron`
2. Builds React application to `dist-app`
3. Packages everything using electron-builder
4. Creates platform-specific distributables

## Environment Detection

The application uses environment detection to:
- Load from `localhost:3000` in development
- Load from built files in production

### IPC Communication

The template includes a robust IPC (Inter-Process Communication) system with full TypeScript support:

1. **Type Safety**:
   - Centralized event payload type definitions
   - Type-safe IPC event handling in both main and renderer processes
   - Automatic payload type inference

2. **Utility Functions**:
   - `ipcMainHandle`: Register type-safe event handlers in the main process
   - `ipcMainOn`: Listen for events in the main process
   - `ipcInvoke`: Invoke events from the renderer process
   - `ipcOn`: Subscribe to events in the renderer process

3. **Security**:
   - Content Security Policy (CSP) implementation
   - Secure preload script configuration
   - Controlled exposure of Electron APIs

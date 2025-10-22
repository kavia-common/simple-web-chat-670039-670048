# Simple Web Chat Frontend

A minimal single-page chat UI built with React (Create React App), styled using the Ocean Professional theme.

## Features
- Modern, minimal UI with rounded corners, shadows, and subtle gradients
- Message list with auto-scroll that respects user scrolling
- Fixed input bar with "send on Enter" (Shift+Enter for newline)
- Stubbed REST/WebSocket integration points for easy backend wiring
- Graceful local-only mode when env vars are not configured
- Accessible labels for input and buttons

## Quick Start

Install dependencies and run the dev server:

```bash
npm install
npm start
```

The app runs at http://localhost:3000 by default.

## Environment Variables

These variables are optional; if not provided, the app will run locally and log an info message.

For Create React App:
- `REACT_APP_BACKEND_HTTP_URL` — Base URL for REST (e.g., http://localhost:8000)
- `REACT_APP_BACKEND_WS_URL` — WebSocket URL (e.g., ws://localhost:8000/ws)

For Vite-based builds (not required here, included for portability):
- `VITE_BACKEND_HTTP_URL`
- `VITE_BACKEND_WS_URL`

See `.env.example` for placeholders.

## Wiring to Backend

The hook `src/hooks/useChat.js` exposes:
- `connectWebSocket()`, `disconnectWebSocket()`, `sendMessage(text)`
- `messages`, `isConnected`, `error`

Behavior:
- If `REACT_APP_BACKEND_WS_URL` is set, it will attempt a real WebSocket connection.
- If a WebSocket is connected, messages are sent through it.
- If WebSocket is not connected but `REACT_APP_BACKEND_HTTP_URL` is set, it will attempt to `POST /messages` as a fallback.
- Without env vars, it runs in local-only mode and keeps messages in memory.

## Project Structure

- `src/theme.js` — Theme tokens/utilities
- `src/index.css` — Global reset and layout styles
- `src/App.jsx` — Main composition of MessageList and MessageInput
- `src/components/MessageList.jsx` — Scrollable message list with auto-pin
- `src/components/MessageInput.jsx` — Textarea with send behavior
- `src/hooks/useChat.js` — Chat logic with backend stubs

## Accessibility
- Buttons have `aria-label`s
- Input uses a descriptive placeholder and label
- High-contrast text with readable font sizes

## Build
```bash
npm run build
```

Outputs to `build/`.

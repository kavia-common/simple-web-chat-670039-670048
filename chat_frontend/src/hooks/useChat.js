import { useCallback, useEffect, useRef, useState } from 'react';

// PUBLIC_INTERFACE
export function useChat() {
  /**
   * Exposes chat state and actions, with stubbed backend integration.
   * Env vars:
   * - REACT_APP_BACKEND_HTTP_URL (Create React App)
   * - REACT_APP_BACKEND_WS_URL
   *
   * Note: For Vite builds, you may also use VITE_BACKEND_HTTP_URL / VITE_BACKEND_WS_URL.
   * This hook will check both and prefer REACT_APP_* in this CRA template.
   */
  const httpUrl =
    process.env.REACT_APP_BACKEND_HTTP_URL ||
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_HTTP_URL) ||
    '';
  const wsUrl =
    process.env.REACT_APP_BACKEND_WS_URL ||
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_WS_URL) ||
    '';

  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const wsRef = useRef(null);

  // Log missing configuration and operate in local mode
  useEffect(() => {
    if (!httpUrl || !wsUrl) {
      // eslint-disable-next-line no-console
      console.info(
        '[useChat] Backend URLs not configured. Set REACT_APP_BACKEND_HTTP_URL and REACT_APP_BACKEND_WS_URL (or VITE_* variants). Running in local-only mode.'
      );
    }
  }, [httpUrl, wsUrl]);

  // PUBLIC_INTERFACE
  const connectWebSocket = useCallback(() => {
    /**
     * Attempts to connect to WebSocket backend if WS URL exists.
     * In local mode, simulates a successful connection.
     */
    if (!wsUrl) {
      setIsConnected(true);
      return;
    }

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
      };
      ws.onerror = (evt) => {
        setError('WebSocket error');
        // eslint-disable-next-line no-console
        console.warn('[useChat] WebSocket error:', evt);
      };
      ws.onclose = () => {
        setIsConnected(false);
      };
      ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          // Expecting { id, text, sender, timestamp }
          if (data && data.text) {
            setMessages((prev) => [...prev, data]);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[useChat] Failed to parse WS message', e);
        }
      };
    } catch (e) {
      setError('Failed to connect WebSocket');
      // eslint-disable-next-line no-console
      console.warn('[useChat] WebSocket connection failed:', e);
    }
  }, [wsUrl]);

  // PUBLIC_INTERFACE
  const disconnectWebSocket = useCallback(() => {
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch { /* no-op */ }
      wsRef.current = null;
    }
    setIsConnected(false);
  }, []);

  // PUBLIC_INTERFACE
  const sendMessage = useCallback(
    async (text) => {
      /**
       * Sends a message to backend if available.
       * Always returns immediately for UI responsiveness.
       */
      const payload = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        text,
        sender: 'you',
        timestamp: Date.now(),
      };

      // Optimistic local append
      setMessages((prev) => [...prev, payload]);

      // Try WebSocket first
      if (wsRef.current && wsRef.current.readyState === 1) {
        try {
          wsRef.current.send(JSON.stringify(payload));
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[useChat] Failed to send via WebSocket', e);
        }
      } else if (httpUrl) {
        // Fallback to REST (stub)
        try {
          await fetch(`${httpUrl}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[useChat] REST send failed (stub):', e);
        }
      } else {
        // eslint-disable-next-line no-console
        console.info('[useChat] Operating in local-only mode, message not sent to backend.');
      }
    },
    [httpUrl]
  );

  return {
    messages,
    setMessages, // internal utility exposed to seed mock data
    isConnected,
    error,
    connectWebSocket,
    disconnectWebSocket,
    sendMessage,
  };
}

import { useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { useChat } from './hooks/useChat';
import { applyThemeToRoot } from './theme';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Single-page chat UI: message list and input.
   * Uses useChat hook for stubbed backend integration.
   */
  const {
    messages,
    setMessages,
    isConnected,
    error,
    connectWebSocket,
    disconnectWebSocket,
    sendMessage,
  } = useChat();

  // Apply theme variables to root
  useEffect(() => {
    applyThemeToRoot();
  }, []);

  // Seed initial messages to demonstrate layout
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { id: 'm1', text: 'Welcome to Simple Web Chat 👋', sender: 'other', timestamp: Date.now() - 1000 * 60 },
        { id: 'm2', text: 'This is a demo conversation. Type a message below!', sender: 'other', timestamp: Date.now() - 1000 * 30 },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attempt to connect to WebSocket on mount
  useEffect(() => {
    connectWebSocket();
    return () => disconnectWebSocket();
  }, [connectWebSocket, disconnectWebSocket]);

  const handleSend = (text) => {
    sendMessage(text);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand" aria-label="App brand">
            <div className="brand-badge" aria-hidden="true" />
            Simple Web Chat
          </div>
          <div className="status" role="status" aria-live="polite">
            {error
              ? `Status: Error – ${error}`
              : `Status: ${isConnected ? 'Connected' : 'Local mode'}`}
          </div>
        </div>
      </header>

      <main className="app-content">
        <section className="chat-container">
          <MessageList messages={messages} />
          <MessageInput onSend={handleSend} />
        </section>
      </main>
    </div>
  );
}

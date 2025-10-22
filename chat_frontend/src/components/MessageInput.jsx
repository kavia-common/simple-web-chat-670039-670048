import { useState } from 'react';

/**
 * MessageInput renders a multi-line input with a send button.
 *
 * props:
 * - onSend: (text: string) => void
 * - disabled?: boolean
 */
export default function MessageInput({ onSend, disabled = false }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-bar">
      <div className="input-inner" role="form" aria-label="Send a message">
        <textarea
          aria-label="Message input"
          className="input-control"
          placeholder="Type your message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
        />
        <button
          type="button"
          className="send-btn"
          onClick={handleSend}
          disabled={disabled || text.trim().length === 0}
          aria-label="Send message"
          title="Send"
        >
          Send
        </button>
      </div>
    </div>
  );
}

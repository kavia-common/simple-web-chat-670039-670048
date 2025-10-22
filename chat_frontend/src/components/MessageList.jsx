import { useEffect, useRef, useState } from 'react';

/**
 * MessageList renders a scrollable list of messages and keeps the view
 * pinned to bottom unless the user has scrolled up significantly.
 *
 * props:
 * - messages: Array<{ id: string, text: string, sender: 'you'|'other', timestamp: number }>
 */
export default function MessageList({ messages = [] }) {
  const listRef = useRef(null);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);

  useEffect(() => {
    if (!listRef.current) return;
    if (isPinnedToBottom) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isPinnedToBottom]);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const threshold = 80; // px from bottom to consider pinned
    const distanceFromBottom = el.scrollHeight - el.clientHeight - el.scrollTop;
    setIsPinnedToBottom(distanceFromBottom < threshold);
  };

  return (
    <div
      ref={listRef}
      className="message-list surface"
      onScroll={onScroll}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {messages.map(m => (
        <div className={`message-row ${m.sender === 'you' ? 'you' : 'other'}`} key={m.id}>
          <div className={`message ${m.sender === 'you' ? 'you' : 'other'}`}>
            <div>{m.text}</div>
            <span className="message-meta">
              {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

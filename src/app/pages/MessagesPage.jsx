import { useState, useRef, useEffect } from 'react';
import { Send, Lock, ChevronDown, MessageSquare, Clock } from 'lucide-react';

const CATEGORY_LABELS = {
  general: 'General',
  complaint: 'Complaint',
  inquiry: 'Inquiry',
  emergency: 'Emergency',
};

const CATEGORY_COLORS = {
  general: 'bg-blue-100 text-blue-700',
  complaint: 'bg-orange-100 text-orange-700',
  inquiry: 'bg-purple-100 text-purple-700',
  emergency: 'bg-red-100 text-red-700',
};

const STATUS_COLORS = {
  open: 'bg-yellow-100 text-yellow-700',
  replied: 'bg-green-100 text-green-700',
  closed: 'bg-muted text-muted-foreground',
};

const SEED_THREADS = [
  {
    id: 't1',
    subject: 'Noise complaint — Room 214',
    category: 'complaint',
    status: 'replied',
    lastActivity: new Date(Date.now() - 1000 * 60 * 45),
    messages: [
      {
        id: 'm1',
        from: 'user',
        text: 'Hi, Room 214 has been playing loud music past midnight every weekday this week. It\'s affecting my sleep and studies. Could you please look into this?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        senderName: 'You',
      },
      {
        id: 'm2',
        from: 'admin',
        text: 'Thank you for letting us know. We\'ve issued a formal notice to the resident in Room 214 and reminded them of quiet hours (10 PM–7 AM). Please don\'t hesitate to report again if the issue persists.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        senderName: 'Admin — Ms. Reyes',
      },
    ],
  },
  {
    id: 't2',
    subject: 'Question about guest overnight policy',
    category: 'inquiry',
    status: 'open',
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 7),
    messages: [
      {
        id: 'm3',
        from: 'user',
        text: 'I have a family member visiting from out of town this weekend. Could I get clarification on the overnight guest policy and what forms I need to submit?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7),
        senderName: 'You',
      },
    ],
  },
];

function formatTime(date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function formatFullTime(date) {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function MessagesPage() {
  const [threads, setThreads] = useState(SEED_THREADS);
  const [selectedId, setSelectedId] = useState(SEED_THREADS[0].id);
  const [reply, setReply] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [newMessage, setNewMessage] = useState('');
  const bottomRef = useRef(null);

  const selected = threads.find((t) => t.id === selectedId) ?? null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected?.messages.length]);

  function sendReply() {
    if (!reply.trim() || !selected) return;
    const msg = {
      id: crypto.randomUUID(),
      from: 'user',
      text: reply.trim(),
      timestamp: new Date(),
      senderName: 'You',
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? { ...t, messages: [...t.messages, msg], lastActivity: new Date(), status: 'open' }
          : t
      )
    );
    setReply('');
  }

  function submitNewThread() {
    if (!newSubject.trim() || !newMessage.trim()) return;
    const thread = {
      id: crypto.randomUUID(),
      subject: newSubject.trim(),
      category: newCategory,
      status: 'open',
      lastActivity: new Date(),
      messages: [
        {
          id: crypto.randomUUID(),
          from: 'user',
          text: newMessage.trim(),
          timestamp: new Date(),
          senderName: 'You',
        },
      ],
    };
    setThreads((prev) => [thread, ...prev]);
    setSelectedId(thread.id);
    setShowCompose(false);
    setNewSubject('');
    setNewMessage('');
    setNewCategory('general');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Private Messages</h1>
          <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Your conversations with dormitory administration are private and confidential
          </p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          <MessageSquare className="w-4 h-4" />
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        {/* Thread list */}
        <aside className="border border-border rounded-xl overflow-hidden flex flex-col bg-card">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conversations</p>
          </div>
          <div className="overflow-y-auto flex-1">
            {threads.length === 0 && (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No messages yet. Start a new conversation.
              </div>
            )}
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setSelectedId(thread.id)}
                className={`w-full text-left px-4 py-4 border-b border-border transition-colors ${
                  selectedId === thread.id
                    ? 'bg-primary/5 border-l-2 border-l-primary'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-sm font-medium text-foreground line-clamp-1 flex-1">
                    {thread.subject}
                  </span>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(thread.lastActivity)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[thread.category]}`}>
                    {CATEGORY_LABELS[thread.category]}
                  </span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${STATUS_COLORS[thread.status]}`}>
                    {thread.status.charAt(0).toUpperCase() + thread.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
                  {thread.messages[thread.messages.length - 1].text}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Thread view */}
        <div className="border border-border rounded-xl overflow-hidden flex flex-col bg-card">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a conversation to read</p>
              </div>
            </div>
          ) : (
            <>
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-base font-medium text-foreground">{selected.subject}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[selected.category]}`}>
                      {CATEGORY_LABELS[selected.category]}
                    </span>
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${STATUS_COLORS[selected.status]}`}>
                      {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                    </span>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                {selected.messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      msg.from === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 px-1">
                      <span className="text-[11px] font-medium text-muted-foreground">{msg.senderName}</span>
                      <span className="text-[11px] text-muted-foreground">·</span>
                      <span className="text-[11px] text-muted-foreground">{formatFullTime(msg.timestamp)}</span>
                    </div>
                  </div>
                ))}
                {selected.status === 'closed' && (
                  <div className="text-center text-xs text-muted-foreground py-2">
                    This conversation has been closed by an admin.
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {selected.status !== 'closed' && (
                <div className="px-5 py-4 border-t border-border">
                  <div className="flex gap-3">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendReply();
                        }
                      }}
                      placeholder="Write a reply… (Enter to send, Shift+Enter for new line)"
                      rows={2}
                      className="flex-1 resize-none rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                    <button
                      onClick={sendReply}
                      disabled={!reply.trim()}
                      className="self-end px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-2 text-sm font-medium"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showCompose && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && setShowCompose(false)}
        >
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl">
            <div className="px-6 py-5 border-b border-border">
              <h3 className="text-base font-medium">New Message to Admin</h3>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Only you and dormitory admins can read this
              </p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Subject</label>
                <input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Question about laundry room hours"
                  className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Category</label>
                <div className="relative">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring pr-8"
                  >
                    {Object.keys(CATEGORY_LABELS).map((c) => (
                      <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Message</label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Describe your concern or question in detail…"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitNewThread}
                disabled={!newSubject.trim() || !newMessage.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity text-sm font-medium"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

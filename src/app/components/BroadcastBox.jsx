import { Megaphone, X } from 'lucide-react';

const typeStyles = {
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-100',
  warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-900 dark:text-yellow-100',
  urgent: 'bg-destructive/10 border-destructive/30 text-destructive-foreground',
};

export function BroadcastBox({ broadcasts, onDismiss }) {
  if (broadcasts.length === 0) return null;

  const formatTime = (date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(date);

  return (
    <div className="space-y-3 mb-6">
      {broadcasts.map((broadcast) => (
        <div key={broadcast.id} className={`border rounded-lg p-4 ${typeStyles[broadcast.type]}`}>
          <div className="flex items-start gap-3">
            <Megaphone className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h4>{broadcast.title}</h4>
                {onDismiss && (
                  <button
                    onClick={() => onDismiss(broadcast.id)}
                    className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-sm opacity-90 mb-2">{broadcast.message}</p>
              <span className="text-xs opacity-75">{formatTime(broadcast.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

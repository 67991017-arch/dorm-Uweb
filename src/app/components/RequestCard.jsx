import { Calendar, MapPin, AlertTriangle, Trash2 } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  resolved: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
};

const priorityColors = {
  low: 'text-muted-foreground',
  medium: 'text-yellow-600 dark:text-yellow-500',
  high: 'text-orange-600 dark:text-orange-500',
  urgent: 'text-destructive',
};

const categoryIcons = {
  plumbing: '🚰',
  electrical: '⚡',
  furniture: '🪑',
  hvac: '❄️',
  cleaning: '🧹',
  security: '🔒',
  other: '📝',
};

export function RequestCard({ request, onStatusChange, onDelete }) {
  const formatDate = (date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(date);

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{categoryIcons[request.category] || categoryIcons.other}</div>
          <div>
            <h3 className="capitalize">{request.category}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Room {request.roomNumber}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[request.status]}`}>
          {request.status === 'in-progress' ? 'In Progress' : request.status}
        </span>
      </div>

      <p className="text-foreground/90 mb-4">{request.description}</p>

      {request.imageUrl && (
        <img src={request.imageUrl} alt="Issue" className="w-full h-40 object-cover rounded-lg mb-4" />
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(request.createdAt)}</span>
          </div>
          <div className={`flex items-center gap-1.5 capitalize ${priorityColors[request.priority]}`}>
            <AlertTriangle className="w-4 h-4" />
            <span>{request.priority} priority</span>
          </div>
        </div>

        {request.status === 'resolved' ? (
          <button
            onClick={() => onDelete(request.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-destructive border border-destructive/30 rounded-md hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        ) : (
          <select
            value={request.status}
            onChange={(e) => onStatusChange(request.id, e.target.value)}
            className="px-3 py-1.5 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        )}
      </div>
    </div>
  );
}

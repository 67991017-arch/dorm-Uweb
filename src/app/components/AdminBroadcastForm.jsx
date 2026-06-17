import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Megaphone, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function AdminBroadcastForm({ onBroadcast }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { type: 'info' },
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const onSubmit = (data) => {
    onBroadcast(data);
    toast.success('Broadcast sent to all residents');
    reset();
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg hover:from-primary/15 hover:to-primary/10 transition-colors"
      >
        <Megaphone className="w-5 h-5 text-primary" />
        <div className="text-left flex-1">
          <h4 className="text-primary">Admin Broadcast</h4>
          <p className="text-sm text-muted-foreground">Send announcement to all residents</p>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="w-5 h-5 text-primary" />
        <h3 className="text-primary">Admin Broadcast</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="broadcast-title" className="block mb-2">Title</label>
          <input
            id="broadcast-title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="e.g., Scheduled Maintenance"
          />
          {errors.title && (
            <div className="flex items-center gap-1 mt-1.5 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.title.message}</span>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="broadcast-message" className="block mb-2">Message</label>
          <textarea
            id="broadcast-message"
            {...register('message', { required: 'Message is required' })}
            rows={3}
            className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="Enter your announcement message..."
          />
          {errors.message && (
            <div className="flex items-center gap-1 mt-1.5 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.message.message}</span>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="broadcast-type" className="block mb-2">Type</label>
          <select
            id="broadcast-type"
            {...register('type')}
            className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="info">Info - General announcement</option>
            <option value="warning">Warning - Important notice</option>
            <option value="urgent">Urgent - Critical alert</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => { setIsExpanded(false); reset(); }}
            className="flex-1 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Broadcast
          </button>
        </div>
      </form>
    </div>
  );
}

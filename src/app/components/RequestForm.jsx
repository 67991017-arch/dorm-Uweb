import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function RequestForm({ onSubmit, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (data) => {
    onSubmit({ ...data, imageUrl: imagePreview || undefined });
    toast.success('Maintenance request submitted successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2>Submit Maintenance Request</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
            <div>
              <label htmlFor="roomNumber" className="block mb-2">Room Number</label>
              <input
                id="roomNumber"
                type="text"
                {...register('roomNumber', { required: 'Room number is required' })}
                className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g., A-204"
              />
              {errors.roomNumber && (
                <div className="flex items-center gap-1 mt-1.5 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.roomNumber.message}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block mb-2">Category</label>
              <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="furniture">Furniture</option>
                <option value="hvac">HVAC</option>
                <option value="cleaning">Cleaning</option>
                <option value="security">Security</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <div className="flex items-center gap-1 mt-1.5 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.category.message}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="priority" className="block mb-2">Priority</label>
              <select
                id="priority"
                {...register('priority', { required: 'Priority is required' })}
                className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select priority level</option>
                <option value="low">Low - Can wait a few days</option>
                <option value="medium">Medium - Needs attention soon</option>
                <option value="high">High - Needs urgent attention</option>
                <option value="urgent">Urgent - Immediate safety concern</option>
              </select>
              {errors.priority && (
                <div className="flex items-center gap-1 mt-1.5 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.priority.message}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block mb-2">Description</label>
              <textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Describe the issue in detail..."
              />
              {errors.description && (
                <div className="flex items-center gap-1 mt-1.5 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.description.message}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2">Photo (Optional)</label>
              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              ) : (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-1.5 bg-background/90 rounded-full hover:bg-background transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

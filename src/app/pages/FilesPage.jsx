import { useState } from 'react';
import { Upload, FileText, Download, Trash2, X, File } from 'lucide-react';
import { toast } from 'sonner';

export function FilesPage() {
  const [files, setFiles] = useState([
    { id: '1', name: 'Dorm Contract 2026.pdf', size: '245 KB', uploadedAt: new Date(2026, 0, 15), type: 'application/pdf' },
    { id: '2', name: 'Room Inspection Report.pdf', size: '128 KB', uploadedAt: new Date(2026, 3, 10), type: 'application/pdf' },
  ]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadFile(file);
  };

  const handleUpload = () => {
    if (!uploadFile) return;
    const newFile = {
      id: Date.now().toString(),
      name: uploadFile.name,
      size: `${Math.round(uploadFile.size / 1024)} KB`,
      uploadedAt: new Date(),
      type: uploadFile.type,
    };
    setFiles([newFile, ...files]);
    toast.success('File uploaded successfully');
    setShowUploadModal(false);
    setUploadFile(null);
  };

  const handleDelete = (id) => {
    setFiles(files.filter((f) => f.id !== id));
    toast.success('File deleted');
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word') || type.includes('document')) return '📝';
    return '📎';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1>My Files</h1>
            <p className="text-muted-foreground mt-1">Upload and manage your dormitory documents</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload File
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl mb-1">{files.length}</div>
              <div className="text-sm text-muted-foreground">Total Files</div>
            </div>
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="mb-2">No files uploaded</h3>
          <p className="text-muted-foreground mb-6">Upload your first document to get started</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload File
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div key={file.id} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{getFileIcon(file.type)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="truncate mb-1">{file.name}</h4>
                  <p className="text-sm text-muted-foreground">{file.size}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-4">Uploaded {formatDate(file.uploadedAt)}</div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>Upload File</h2>
              <button onClick={() => { setShowUploadModal(false); setUploadFile(null); }} className="p-2 hover:bg-muted rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {!uploadFile ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mb-3" />
                  <span className="text-sm text-muted-foreground mb-1">Click to select file</span>
                  <span className="text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG (Max 10MB)</span>
                  <input type="file" onChange={handleFileSelect} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                </label>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <File className="w-8 h-8 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{uploadFile.name}</p>
                    <p className="text-sm text-muted-foreground">{Math.round(uploadFile.size / 1024)} KB</p>
                  </div>
                  <button onClick={() => setUploadFile(null)} className="p-1 hover:bg-background rounded transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowUploadModal(false); setUploadFile(null); }}
                  className="flex-1 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!uploadFile}
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

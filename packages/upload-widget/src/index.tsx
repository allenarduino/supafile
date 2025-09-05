import './index.css';

// Auto-inject CSS if not already injected
if (typeof document !== 'undefined' && !document.getElementById('supafile-upload-widget-styles')) {
    const link = document.createElement('link');
    link.id = 'supafile-upload-widget-styles';
    link.rel = 'stylesheet';
    link.href = 'data:text/css;base64,' + btoa(`
    .upload-widget{width:100%;max-width:32rem;margin:0 auto}
    .upload-dropzone{background-color:white;border:2px dashed #d1d5db;border-radius:0.5rem;padding:2rem;text-align:center;transition:border-color 0.2s ease;cursor:pointer}
    .upload-dropzone:hover{border-color:#9ca3af}
    .upload-icon{width:3rem;height:3rem;margin:0 auto 1rem;color:#9ca3af}
    .upload-title{font-size:1.125rem;font-weight:500;color:#111827;margin-bottom:0.5rem}
    .upload-instructions{color:#6b7280;margin-bottom:0.25rem}
    .upload-size-limit{font-size:0.875rem;color:#9ca3af}
    .upload-loading{margin-top:1rem}
    .upload-loading-content{display:inline-flex;align-items:center;padding:0.5rem 1rem;background-color:#eff6ff;color:#1d4ed8;border-radius:0.5rem}
    .upload-spinner{animation:spin 1s linear infinite;border-radius:50%;height:1rem;width:1rem;border-bottom:2px solid #2563eb;margin-right:0.5rem}
    @keyframes spin{to{transform:rotate(360deg)}}
    .file-list{margin-top:1.5rem;display:flex;flex-direction:column;gap:0.75rem}
    .file-item{display:flex;align-items:center;justify-content:space-between;background-color:#f9fafb;border-radius:0.5rem;padding:1rem;border:1px solid #e5e7eb}
    .file-preview{display:flex;align-items:center;gap:0.75rem}
    .file-icon{width:2.5rem;height:2.5rem;background-color:#e5e7eb;border-radius:0.25rem;display:flex;align-items:center;justify-content:center;color:#6b7280}
    .file-icon img{width:2.5rem;height:2.5rem;object-fit:cover;border-radius:0.25rem}
    .file-info{flex:1;text-align:left}
    .file-name{color:#111827;font-size:0.875rem;font-weight:500}
    .file-size{color:#6b7280;font-size:0.75rem}
    .remove-button{color:#ef4444;font-size:0.875rem;font-weight:500;padding:0.25rem 0.75rem;border-radius:0.25rem;transition:all 0.2s ease;border:none;background:none;cursor:pointer}
    .remove-button:hover{color:#dc2626;background-color:#fef2f2}
    .hidden{display:none}
  `);
    document.head.appendChild(link);
}

export { FileUploader } from './components/FileUploader';
export type { UploadedFile } from './hooks/useUpload';

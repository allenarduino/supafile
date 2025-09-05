import './index.css';

// Auto-inject CSS if not already injected
if (typeof document !== 'undefined' && !document.getElementById('supafile-upload-widget-styles')) {
    const link = document.createElement('link');
    link.id = 'supafile-upload-widget-styles';
    link.rel = 'stylesheet';
    link.href = 'data:text/css;base64,' + btoa(`
    .upload-widget{width:100%;max-width:var(--upload-widget-max-width,32rem);margin:0 auto;height:var(--upload-widget-height,auto);min-height:var(--upload-widget-min-height,200px)}
    .upload-dropzone{background-color:var(--upload-widget-bg,white);border:2px dashed var(--upload-widget-border-color,#d1d5db);border-radius:var(--upload-widget-border-radius,0.5rem);padding:var(--upload-widget-padding,2rem);text-align:center;transition:border-color 0.2s ease;cursor:pointer;height:100%}
    .upload-dropzone:hover{border-color:var(--upload-widget-border-hover,#9ca3af)}
    .upload-icon{width:var(--upload-widget-icon-size,3rem);height:var(--upload-widget-icon-size,3rem);margin:0 auto 1rem;color:var(--upload-widget-icon-color,#9ca3af)}
    .upload-title{font-size:var(--upload-widget-title-size,1.125rem);font-weight:500;color:var(--upload-widget-title-color,#111827);margin-bottom:0.5rem}
    .upload-instructions{color:var(--upload-widget-text-color,#6b7280);margin-bottom:0.25rem}
    .upload-size-limit{font-size:0.875rem;color:var(--upload-widget-text-muted,#9ca3af)}
    .upload-loading{margin-top:1rem}
    .upload-loading-content{display:inline-flex;align-items:center;padding:0.5rem 1rem;background-color:var(--upload-widget-loading-bg,#eff6ff);color:var(--upload-widget-loading-color,#1d4ed8);border-radius:0.5rem}
    .upload-spinner{animation:spin 1s linear infinite;border-radius:50%;height:1rem;width:1rem;border-bottom:2px solid var(--upload-widget-spinner-color,#2563eb);margin-right:0.5rem}
    @keyframes spin{to{transform:rotate(360deg)}}
    .file-list{margin-top:1.5rem;display:flex;flex-direction:column;gap:0.75rem}
    .file-item{display:flex;align-items:center;justify-content:space-between;background-color:var(--upload-widget-file-bg,#f9fafb);border-radius:0.5rem;padding:1rem;border:1px solid var(--upload-widget-file-border,#e5e7eb)}
    .file-preview{display:flex;align-items:center;gap:0.75rem}
    .file-icon{width:2.5rem;height:2.5rem;background-color:var(--upload-widget-file-icon-bg,#e5e7eb);border-radius:0.25rem;display:flex;align-items:center;justify-content:center;color:var(--upload-widget-file-icon-color,#6b7280)}
    .file-icon img{width:2.5rem;height:2.5rem;object-fit:cover;border-radius:0.25rem}
    .file-info{flex:1;text-align:left}
    .file-name{color:var(--upload-widget-file-name-color,#111827);font-size:0.875rem;font-weight:500}
    .file-size{color:var(--upload-widget-file-size-color,#6b7280);font-size:0.75rem}
    .remove-button{color:var(--upload-widget-remove-color,#ef4444);font-size:0.875rem;font-weight:500;padding:0.25rem 0.75rem;border-radius:0.25rem;transition:all 0.2s ease;border:none;background:none;cursor:pointer}
    .remove-button:hover{color:var(--upload-widget-remove-hover,#dc2626);background-color:var(--upload-widget-remove-bg-hover,#fef2f2)}
    .hidden{display:none}
  `);
    document.head.appendChild(link);
}

export { FileUploader } from './components/FileUploader';
export type { UploadedFile } from './hooks/useUpload';

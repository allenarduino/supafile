import React from 'react';
import { type UploadedFile } from '../hooks/useUpload';

interface FilePreviewProps {
    file: UploadedFile;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
    const isImage = file.url.endsWith('.png') || file.url.endsWith('.jpg') || file.url.endsWith('.jpeg');

    return (
        <div className="file-preview">
            {isImage && file.url ? (
                <img src={file.url} alt={file.name} className="file-icon" />
            ) : (
                <div className="file-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            )}
            <div className="file-info">
                <span className="file-name">{file.name}</span>
                <p className="file-size">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
        </div>
    );
};

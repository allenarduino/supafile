import React from 'react';
import { type UploadedFile } from '../hooks/useUpload';
import { FileText, File } from 'lucide-react';

interface FilePreviewProps {
    file: UploadedFile;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
    const isImage = file.url.endsWith('.png') || file.url.endsWith('.jpg') || file.url.endsWith('.jpeg') ||
        file.url.endsWith('.gif') || file.url.endsWith('.webp') || file.url.endsWith('.svg');
    const isPdf = file.name.toLowerCase().endsWith('.pdf');

    const getFileIcon = () => {
        if (isImage && file.url) {
            return <img src={file.url} alt={file.name} className="file-icon" />;
        } else if (isPdf) {
            return <FileText size={20} className="file-icon" />;
        } else {
            return <File size={20} className="file-icon" />;
        }
    };

    return (
        <div className="file-preview">
            {getFileIcon()}
            <div className="file-info">
                <span className="file-name">{file.name}</span>
                <p className="file-size">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
        </div>
    );
};

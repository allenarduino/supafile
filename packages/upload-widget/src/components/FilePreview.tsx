import React from 'react';
import { type UploadedFile } from '../hooks/useUpload';

interface FilePreviewProps {
    file: UploadedFile;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
    const isImage = file.url.endsWith('.png') || file.url.endsWith('.jpg') || file.url.endsWith('.jpeg');

    return (
        <div className="flex items-center space-x-2">
            {isImage && <img src={file.url} alt={file.name} className="w-12 h-12 object-cover rounded" />}
            <span>{file.name}</span>
        </div>
    );
};

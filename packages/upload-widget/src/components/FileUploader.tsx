import React, { useRef } from 'react';
import { useUpload, type UploadedFile } from '../hooks/useUpload';
import { FilePreview } from './FilePreview';

interface FileUploaderProps {
    supabaseUrl: string;
    supabaseAnonKey: string;
    bucket: string;
    maxFileSize?: number;
    allowedTypes?: string[];
    multiple?: boolean;
    className?: string;
    onUploadComplete?: (file: UploadedFile) => void;
    onUploadError?: (file: File, error: Error) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
    supabaseUrl,
    supabaseAnonKey,
    bucket,
    maxFileSize = 5 * 1024 * 1024,
    allowedTypes = ['image/png', 'image/jpeg'],
    multiple = true,
    className,
    onUploadComplete,
    onUploadError
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { files, uploading, uploadFiles, removeFile } = useUpload({ supabaseUrl, supabaseAnonKey, bucket });

    const handleFiles = (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;

        const validFiles = Array.from(selectedFiles).filter(file => {
            if (!allowedTypes.includes(file.type)) {
                onUploadError?.(file, new Error('Invalid file type'));
                return false;
            }
            if (file.size > maxFileSize) {
                onUploadError?.(file, new Error('File too large'));
                return false;
            }
            return true;
        });

        uploadFiles(validFiles);
        validFiles.forEach(file => onUploadComplete?.({ name: file.name, url: '', size: file.size, id: file.name }));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className={`upload-widget ${className || ''}`}>
            <div
                className="upload-dropzone"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    type="file"
                    multiple={multiple}
                    ref={inputRef}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                />

                {/* Upload Icon */}
                <div className="upload-icon">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>

                {/* Main Text */}
                <h3 className="upload-title">
                    {files.length > 0 ? `Upload ${files.length} file${files.length > 1 ? 's' : ''}` : 'Upload files'}
                </h3>

                {/* Instruction Text */}
                <p className="upload-instructions">
                    Drag and drop files here, or click to select
                </p>

                {/* File Size Limit */}
                <p className="upload-size-limit">
                    Maximum file size: {Math.round(maxFileSize / (1024 * 1024))} MB
                </p>

                {uploading && (
                    <div className="upload-loading">
                        <div className="upload-loading-content">
                            <div className="upload-spinner"></div>
                            Uploading...
                        </div>
                    </div>
                )}
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="file-list">
                    {files.map((file) => (
                        <div key={file.name} className="file-item">
                            <FilePreview file={file} />
                            <button
                                className="remove-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(file.name);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

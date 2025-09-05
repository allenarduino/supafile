import React, { useRef } from 'react';
import { useUpload, type UploadedFile } from '../hooks/useUpload';
import { FilePreview } from './FilePreview.tsx';

interface FileUploaderProps {
    supabaseUrl: string;
    supabaseAnonKey: string;
    bucket: string;
    maxFileSize?: number;
    allowedTypes?: string[];
    multiple?: boolean;
    buttonText?: string;
    dropAreaText?: string;
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
    buttonText = 'Select Files',
    dropAreaText = 'Drag & drop files here',
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
        <div
            className={`border-2 border-dashed p-4 rounded-md ${className}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <input
                type="file"
                multiple={multiple}
                ref={inputRef}
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                onClick={() => inputRef.current?.click()}
            >
                {buttonText}
            </button>
            <p className="text-gray-500 text-sm">{dropAreaText}</p>

            {uploading && <p>Uploading...</p>}

            <div className="mt-4 space-y-2">
                {files.map((file) => (
                    <div key={file.name} className="flex items-center justify-between">
                        <FilePreview file={file} />
                        <button className="text-red-500" onClick={() => removeFile(file.name)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

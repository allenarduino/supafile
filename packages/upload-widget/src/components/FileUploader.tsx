import React, { useRef } from 'react';
import { useUpload, type UploadedFile } from '../hooks/useUpload';
import { FilePreview } from './FilePreview';
import { Upload, X } from 'lucide-react';
import { SupabaseClient } from '@supabase/supabase-js';

interface FileUploaderProps {
    // Option 1: Pass Supabase client (recommended for production)
    supabase?: SupabaseClient;
    // Option 2: Pass credentials directly (for demos/testing only)
    supabaseUrl?: string;
    supabaseAnonKey?: string;
    bucket: string;
    maxFileSize?: number;
    allowedTypes?: string[];
    multiple?: boolean;
    className?: string;
    onUploadComplete?: (file: UploadedFile) => void;
    onUploadError?: (file: File, error: Error) => void;
    showFilePreviews?: boolean;
    // Style props
    height?: string;
    minHeight?: string;
    maxWidth?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderHoverColor?: string;
    padding?: string;
    borderRadius?: string;
    titleColor?: string;
    textColor?: string;
    iconColor?: string;
    iconSize?: string;
    titleSize?: string;
    instructionsSize?: string;
    sizeLimitSize?: string;
    fileNameSize?: string;
    fileSizeSize?: string;
    buttonSize?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
    supabase,
    supabaseUrl,
    supabaseAnonKey,
    bucket,
    maxFileSize = 5 * 1024 * 1024,
    allowedTypes = ['image/png', 'image/jpeg'],
    multiple = true,
    className,
    onUploadComplete,
    onUploadError,
    showFilePreviews = true,
    // Style props
    height,
    minHeight,
    maxWidth,
    backgroundColor,
    borderColor,
    borderHoverColor,
    padding,
    borderRadius,
    titleColor,
    textColor,
    iconColor,
    iconSize,
    titleSize,
    instructionsSize,
    sizeLimitSize,
    fileNameSize,
    fileSizeSize,
    buttonSize
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Validate that either supabase client or credentials are provided
    if (!supabase && (!supabaseUrl || !supabaseAnonKey)) {
        throw new Error('Either supabase client or supabaseUrl + supabaseAnonKey must be provided');
    }

    const { files, uploading, uploadFiles, removeFile } = useUpload({
        supabase,
        supabaseUrl,
        supabaseAnonKey,
        bucket
    });

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

    // Create style object from props
    const widgetStyle = {
        '--upload-widget-height': height,
        '--upload-widget-min-height': minHeight,
        '--upload-widget-max-width': maxWidth,
        '--upload-widget-bg': backgroundColor,
        '--upload-widget-border-color': borderColor,
        '--upload-widget-border-hover': borderHoverColor,
        '--upload-widget-padding': padding,
        '--upload-widget-border-radius': borderRadius,
        '--upload-widget-title-color': titleColor,
        '--upload-widget-text-color': textColor,
        '--upload-widget-icon-color': iconColor,
        '--upload-widget-icon-size': iconSize,
        '--upload-widget-title-size': titleSize,
        '--upload-widget-instructions-size': instructionsSize,
        '--upload-widget-size-limit-size': sizeLimitSize,
        '--upload-widget-file-name-size': fileNameSize,
        '--upload-widget-file-size-size': fileSizeSize,
        '--upload-widget-button-size': buttonSize,
    } as React.CSSProperties;

    return (
        <div
            className={`upload-widget ${height ? 'has-custom-height' : ''} ${className || ''}`}
            style={widgetStyle}
        >
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

                {/* Show upload area when no files */}
                {files.length === 0 && (
                    <>
                        {/* Upload Icon */}
                        <div className="upload-icon">
                            <Upload size={24} />
                        </div>

                        {/* Main Text */}
                        <h3 className="upload-title">
                            Upload files
                        </h3>

                        {/* Instruction Text */}
                        <p className="upload-instructions">
                            Drag and drop files here, or click to select
                        </p>

                        {/* File Size Limit */}
                        <p className="upload-size-limit">
                            Maximum file size: {Math.round(maxFileSize / (1024 * 1024))} MB
                        </p>
                    </>
                )}

                {/* Show file list when files are present and previews are enabled */}
                {files.length > 0 && showFilePreviews && (
                    <div className="file-list-inside">
                        <div className="upload-header">
                            <h3 className="upload-title">
                                {files.length} file{files.length > 1 ? 's' : ''} selected
                            </h3>
                            <p className="upload-instructions">
                                Click to add more files
                            </p>
                        </div>

                        <div className="file-list">
                            {files.map((file) => (
                                <div key={file.name} className="file-item">
                                    <FilePreview file={file} />
                                    <button
                                        className="remove-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(file.id);
                                        }}
                                        title="Remove file"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Show simple file count when previews are disabled */}
                {files.length > 0 && !showFilePreviews && (
                    <div className="upload-header">
                        <h3 className="upload-title">
                            {files.length} file{files.length > 1 ? 's' : ''} selected
                        </h3>
                        <p className="upload-instructions">
                            Click to add more files
                        </p>
                    </div>
                )}

                {uploading && (
                    <div className="upload-loading">
                        <div className="upload-loading-content">
                            <div className="upload-spinner"></div>
                            Uploading...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

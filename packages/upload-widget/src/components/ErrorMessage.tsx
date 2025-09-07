import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { type UploadError } from '../hooks/useUpload';

interface ErrorMessageProps {
    errors: UploadError[];
    onDismiss?: () => void;
    className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    errors,
    onDismiss,
    className = ''
}) => {
    if (errors.length === 0) return null;

    return (
        <div className={`upload-error-container ${className}`}>
            <div className="upload-error-header">
                <div className="upload-error-icon">
                    <AlertCircle size={16} />
                </div>
                <div className="upload-error-title">
                    Upload Error{errors.length > 1 ? 's' : ''} ({errors.length})
                </div>
                {onDismiss && (
                    <button
                        className="upload-error-dismiss"
                        onClick={onDismiss}
                        title="Dismiss errors"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
            <div className="upload-error-list">
                {errors.map((error, index) => (
                    <div key={index} className="upload-error-item">
                        <div className="upload-error-file">
                            <strong>{error.file.name}</strong>
                        </div>
                        <div className="upload-error-message">
                            {error.error}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

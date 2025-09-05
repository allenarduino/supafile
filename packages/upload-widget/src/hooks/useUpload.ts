import { useState, useCallback } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface UploadedFile {
    name: string;
    url: string;
    size: number;
    id: string;
}

export interface UploadError {
    file: File;
    error: string;
}

interface UploadOptions {
    supabaseUrl: string;
    supabaseAnonKey: string;
    bucket: string;
    maxFileSize?: number; // in bytes
    allowedTypes?: string[];
}

export const useUpload = ({
    supabaseUrl,
    supabaseAnonKey,
    bucket,
    maxFileSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = [] // empty array means all types allowed
}: UploadOptions) => {
    const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState<UploadError[]>([]);

    const validateFile = useCallback((file: File): string | null => {
        if (file.size > maxFileSize) {
            return `File ${file.name} is too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB`;
        }

        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
            return `File ${file.name} type is not allowed. Allowed types: ${allowedTypes.join(', ')}`;
        }

        return null;
    }, [maxFileSize, allowedTypes]);

    const uploadFiles = useCallback(async (
        selectedFiles: File[],
        onProgress?: (file: File, percent: number) => void
    ) => {
        setUploading(true);
        setErrors([]);
        const uploaded: UploadedFile[] = [];
        const uploadErrors: UploadError[] = [];

        for (const file of selectedFiles) {
            // Validate file
            const validationError = validateFile(file);
            if (validationError) {
                uploadErrors.push({ file, error: validationError });
                continue;
            }

            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;

            try {
                // Simulate progress for now (Supabase doesn't provide real progress)
                onProgress?.(file, 0);

                const { data, error } = await supabase.storage
                    .from(bucket)
                    .upload(fileName, file);

                if (error) {
                    uploadErrors.push({ file, error: error.message });
                    continue;
                }

                // Use the new getPublicUrl method
                const { data: { publicUrl } } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(fileName);

                onProgress?.(file, 100);

                uploaded.push({
                    id: data.path,
                    name: file.name,
                    url: publicUrl,
                    size: file.size,
                });
            } catch (error) {
                uploadErrors.push({
                    file,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }

        setFiles(prev => [...prev, ...uploaded]);
        setErrors(uploadErrors);
        setUploading(false);
    }, [supabase, bucket, validateFile]);

    const removeFile = useCallback((fileId: string) => {
        setFiles(prev => prev.filter(f => f.id !== fileId));
    }, []);

    const clearErrors = useCallback(() => {
        setErrors([]);
    }, []);

    const clearFiles = useCallback(() => {
        setFiles([]);
    }, []);

    return {
        files,
        uploading,
        errors,
        uploadFiles,
        removeFile,
        clearErrors,
        clearFiles
    };
};

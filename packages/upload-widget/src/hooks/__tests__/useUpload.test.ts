import { renderHook, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useUpload } from '../useUpload'

// Mock Supabase
const mockUpload = vi.fn()
const mockGetPublicUrl = vi.fn()
const mockFrom = vi.fn(() => ({
    upload: mockUpload,
    getPublicUrl: mockGetPublicUrl,
}))

const mockSupabaseClient = {
    storage: {
        from: mockFrom,
    },
}

vi.mock('@supabase/supabase-js', () => ({
    createClient: vi.fn(() => mockSupabaseClient),
}))

describe('useUpload', () => {
    const defaultOptions = {
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
        supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        bucket: import.meta.env.VITE_SUPABASE_BUCKET,
    }

    beforeEach(() => {
        vi.clearAllMocks()
        mockUpload.mockResolvedValue({ data: { path: 'test-path' }, error: null })
        mockGetPublicUrl.mockReturnValue({ data: { publicUrl: 'https://test.com/file.jpg' } })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should initialize with empty state', () => {
        const { result } = renderHook(() => useUpload(defaultOptions))

        expect(result.current.files).toEqual([])
        expect(result.current.uploading).toBe(false)
        expect(result.current.errors).toEqual([])
    })

    it('should upload files successfully', async () => {
        const { result } = renderHook(() => useUpload(defaultOptions))
        const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })

        await act(async () => {
            await result.current.uploadFiles([file])
        })

        expect(mockUpload).toHaveBeenCalledWith(
            expect.stringMatching(/^\d+-[a-z0-9]+-test\.jpg$/),
            file
        )
        expect(result.current.files).toHaveLength(1)
        expect(result.current.files[0]).toMatchObject({
            name: 'test.jpg',
            url: 'https://test.com/file.jpg',
            size: file.size,
        })
    })

    it('should handle upload errors', async () => {
        const { result } = renderHook(() => useUpload(defaultOptions))
        const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })

        mockUpload.mockResolvedValueOnce({
            data: null,
            error: { message: 'Upload failed' }
        })

        await act(async () => {
            await result.current.uploadFiles([file])
        })

        expect(result.current.files).toHaveLength(0)
        expect(result.current.errors).toHaveLength(1)
        expect(result.current.errors[0]).toMatchObject({
            file,
            error: 'Upload failed',
        })
    })

    it('should validate file size', async () => {
        const { result } = renderHook(() =>
            useUpload({ ...defaultOptions, maxFileSize: 1000 })
        )
        const largeFile = new File(['x'.repeat(2000)], 'large.jpg', {
            type: 'image/jpeg'
        })

        await act(async () => {
            await result.current.uploadFiles([largeFile])
        })

        expect(mockUpload).not.toHaveBeenCalled()
        expect(result.current.errors).toHaveLength(1)
        expect(result.current.errors[0].error).toContain('too large')
    })

    it('should validate file types', async () => {
        const { result } = renderHook(() =>
            useUpload({
                ...defaultOptions,
                allowedTypes: ['image/jpeg', 'image/png']
            })
        )
        const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' })

        await act(async () => {
            await result.current.uploadFiles([invalidFile])
        })

        expect(mockUpload).not.toHaveBeenCalled()
        expect(result.current.errors).toHaveLength(1)
        expect(result.current.errors[0].error).toContain('type is not allowed')
    })

    it('should handle multiple files', async () => {
        const { result } = renderHook(() => useUpload(defaultOptions))
        const files = [
            new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }),
            new File(['content2'], 'file2.jpg', { type: 'image/jpeg' }),
        ]

        await act(async () => {
            await result.current.uploadFiles(files)
        })

        expect(mockUpload).toHaveBeenCalledTimes(2)
        expect(result.current.files).toHaveLength(2)
    })

    it('should remove files', () => {
        const { result } = renderHook(() => useUpload(defaultOptions))

        // First add a file
        act(() => {
            result.current.files.push({
                id: 'test-id',
                name: 'test.jpg',
                url: 'https://test.com/test.jpg',
                size: 1000,
            })
        })

        // Then remove it
        act(() => {
            result.current.removeFile('test-id')
        })

        expect(result.current.files).toHaveLength(0)
    })

    it('should clear errors', () => {
        const { result } = renderHook(() => useUpload(defaultOptions))

        // Add an error
        act(() => {
            result.current.errors.push({
                file: new File(['test'], 'test.jpg'),
                error: 'Test error',
            })
        })

        // Clear errors
        act(() => {
            result.current.clearErrors()
        })

        expect(result.current.errors).toHaveLength(0)
    })

    it('should clear files', () => {
        const { result } = renderHook(() => useUpload(defaultOptions))

        // Add files
        act(() => {
            result.current.files.push({
                id: 'test-id',
                name: 'test.jpg',
                url: 'https://test.com/test.jpg',
                size: 1000,
            })
        })

        // Clear files
        act(() => {
            result.current.clearFiles()
        })

        expect(result.current.files).toHaveLength(0)
    })

    it('should call progress callback', async () => {
        const { result } = renderHook(() => useUpload(defaultOptions))
        const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })
        const onProgress = vi.fn()

        await act(async () => {
            await result.current.uploadFiles([file], onProgress)
        })

        expect(onProgress).toHaveBeenCalledWith(file, 0)
        expect(onProgress).toHaveBeenCalledWith(file, 100)
    })

    it('should set uploading state correctly', async () => {
        const { result } = renderHook(() => useUpload(defaultOptions))
        const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })

        expect(result.current.uploading).toBe(false)

        // Start upload
        act(() => {
            result.current.uploadFiles([file])
        })

        expect(result.current.uploading).toBe(true)

        // Wait for completion
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0))
        })

        expect(result.current.uploading).toBe(false)
    })
})

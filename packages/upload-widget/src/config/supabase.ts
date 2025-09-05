// Supabase configuration
export const supabaseConfig = {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    bucket: import.meta.env.VITE_SUPABASE_BUCKET || 'uploads',
}

// Validation function
export const validateSupabaseConfig = () => {
    const missing = []

    if (!supabaseConfig.url) missing.push('VITE_SUPABASE_URL')
    if (!supabaseConfig.anonKey) missing.push('VITE_SUPABASE_ANON_KEY')
    if (!supabaseConfig.bucket) missing.push('VITE_SUPABASE_BUCKET')

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }

    return true
}

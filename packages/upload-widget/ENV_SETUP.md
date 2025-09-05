# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in the `packages/upload-widget` directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_SUPABASE_BUCKET=uploads
```

## How to Get Your Supabase Credentials

1. **Go to your Supabase project dashboard**
2. **Navigate to Settings > API**
3. **Copy the following:**
   - **Project URL** → Use as `VITE_SUPABASE_URL`
   - **anon/public key** → Use as `VITE_SUPABASE_ANON_KEY`
   - **Create a storage bucket** → Use bucket name as `VITE_SUPABASE_BUCKET`

## Usage

### Option 1: Use with Environment Variables (Recommended)
```typescript
import { useUploadWithEnv } from './hooks/useUploadWithEnv'

const { files, uploading, uploadFiles } = useUploadWithEnv({
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png']
})
```

### Option 2: Use with Manual Configuration
```typescript
import { useUpload } from './hooks/useUpload'

const { files, uploading, uploadFiles } = useUpload({
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'your-key',
  bucket: 'uploads',
  maxFileSize: 5 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png']
})
```

## Security Notes

- ✅ **Never commit `.env` files** - They're already in `.gitignore`
- ✅ **Use `VITE_` prefix** - Required for Vite to expose variables to client
- ✅ **Use anon key** - Safe for client-side use
- ✅ **Create `.env.example`** - Template for other developers

## Example .env File

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_BUCKET=file-uploads
```

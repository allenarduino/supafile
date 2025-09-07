# Supafile Upload Widget Demo

This demo showcases the `supafile-react-upload-widget` with secure Supabase integration.

## Features Demonstrated

- **Secure Supabase Client** - Uses authenticated client instance (production-ready)
- **File Upload** - Drag & drop file upload with Supabase Storage
- **File Previews** - Inline file previews with remove functionality
- **Error Handling** - Comprehensive error handling and validation
- **TypeScript** - Full type safety and IntelliSense support

## Quick Start

1. Install dependencies:
```bash
pnpm install
```

2. Update Supabase credentials in `src/App.tsx`:
```tsx
const supabase = createClient(
  'https://your-project.supabase.co',
  'your-supabase-anon-key'
);
```

3. Run the demo:
```bash
pnpm dev
```

## Security Features

This demo uses the **recommended secure approach** by passing a Supabase client instance rather than exposing credentials directly in the component props.

## Learn More

- [Supafile Upload Widget Documentation](../../packages/upload-widget/README.md)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Client Documentation](https://supabase.com/docs/reference/javascript)

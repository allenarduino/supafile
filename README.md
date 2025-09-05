# supafile-file-upload

A modern, self-contained React file upload widget built specifically for Supabase users. Features drag-and-drop support, automatic Supabase storage integration, and beautiful styling out of the box.

## Features

- **Built for Supabase** - Easy integration with Supabase Storage
- **Self-contained styling** - No CSS imports needed
- **Drag & drop support** - Modern file upload experience
- **Auto-injected CSS** - Styling automatically loads
- **Customizable** - Extensive style props and CSS variables
- **Responsive** - Works on all screen sizes
- **TypeScript support** - Full type definitions
- **Tested** - Comprehensive test coverage
- **Zero dependencies** - Lightweight and fast
- **Secure** - Uses Supabase's built-in security and authentication

## Installation

```bash
npm install supafile-file-upload
# or
yarn add supafile-file-upload
# or
pnpm add supafile-file-upload
```

## Quick Start

Perfect for Supabase projects! Just provide your Supabase credentials and you're ready to go:

```tsx
import { FileUploader } from 'supafile-file-upload';

function App() {
  return (
    <FileUploader
      supabaseUrl="https://your-project.supabase.co"
      supabaseAnonKey="your-supabase-anon-key"
      bucket="your-storage-bucket"
      onUploadComplete={(file) => console.log('File uploaded to Supabase:', file)}
      onUploadError={(file, error) => console.error('Upload failed:', error)}
    />
  );
}
```

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a storage bucket in your Supabase dashboard
3. Get your credentials from Settings > API
4. Configure RLS policies for your bucket (optional but recommended)

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `supabaseUrl` | `string` | Your Supabase project URL (e.g., `https://xyz.supabase.co`) |
| `supabaseAnonKey` | `string` | Your Supabase anonymous/public key |
| `bucket` | `string` | Supabase Storage bucket name |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxFileSize` | `number` | `5MB` | Maximum file size in bytes |
| `allowedTypes` | `string[]` | `['image/png', 'image/jpeg']` | Allowed MIME types |
| `multiple` | `boolean` | `true` | Allow multiple file selection |
| `className` | `string` | - | Additional CSS class |
| `onUploadComplete` | `(file: UploadedFile) => void` | - | Callback when file uploads |
| `onUploadError` | `(file: File, error: Error) => void` | - | Callback on upload error |

### Style Props

| Prop | Type | Description |
|------|------|-------------|
| `height` | `string` | Widget height (e.g., "300px") |
| `minHeight` | `string` | Minimum height |
| `maxWidth` | `string` | Maximum width |
| `backgroundColor` | `string` | Background color or gradient |
| `borderColor` | `string` | Border color |
| `borderHoverColor` | `string` | Hover border color |
| `padding` | `string` | Internal padding |
| `borderRadius` | `string` | Border radius |
| `titleColor` | `string` | Title text color |
| `textColor` | `string` | Regular text color |
| `iconColor` | `string` | Icon color |
| `iconSize` | `string` | Icon size |
| `titleSize` | `string` | Title font size |

## Examples

### Basic Supabase Integration

```tsx
import { FileUploader } from 'supafile-file-upload';

<FileUploader
  supabaseUrl="https://xyz.supabase.co"
  supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  bucket="user-uploads"
  maxFileSize={10 * 1024 * 1024}
  allowedTypes={['image/png', 'image/jpeg', 'application/pdf']}
  onUploadComplete={(file) => console.log('File uploaded to Supabase:', file)}
  onUploadError={(file, error) => console.error('Supabase upload failed:', error)}
/>
```

### Custom Styling with Props

```tsx
<FileUploader
  supabaseUrl="https://xyz.supabase.co"
  supabaseAnonKey="your-anon-key"
  bucket="uploads"
  // Style props
  height="300px"
  backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  borderColor="#4f46e5"
  titleColor="white"
  textColor="rgba(255, 255, 255, 0.9)"
  iconColor="white"
  borderRadius="1rem"
  padding="3rem"
/>
```

### Custom Styling with CSS

```css
.my-upload-widget {
  --upload-widget-height: 400px;
  --upload-widget-bg: #f0f0f0;
  --upload-widget-border-color: #007bff;
  --upload-widget-border-radius: 20px;
}
```

```tsx
<div className="my-upload-widget">
  <FileUploader {...props} />
</div>
```

### Compact Widget

```tsx
<FileUploader
  supabaseUrl="https://xyz.supabase.co"
  supabaseAnonKey="your-anon-key"
  bucket="uploads"
  height="150px"
  minHeight="120px"
  maxWidth="400px"
  padding="1.5rem"
  iconSize="2rem"
  titleSize="1rem"
/>
```

## CSS Custom Properties

You can customize the widget using CSS custom properties:

```css
.upload-widget {
  --upload-widget-height: 300px;
  --upload-widget-min-height: 250px;
  --upload-widget-max-width: 500px;
  --upload-widget-bg: white;
  --upload-widget-border-color: #d1d5db;
  --upload-widget-border-hover: #9ca3af;
  --upload-widget-padding: 2rem;
  --upload-widget-border-radius: 0.5rem;
  --upload-widget-title-color: #111827;
  --upload-widget-text-color: #6b7280;
  --upload-widget-icon-color: #9ca3af;
  --upload-widget-icon-size: 3rem;
  --upload-widget-title-size: 1.125rem;
  /* And many more... */
}
```

## TypeScript Support

The package includes full TypeScript definitions:

```tsx
import { FileUploader, type UploadedFile } from '@supafile/upload-widget';

interface MyComponentProps {
  onFileUpload: (file: UploadedFile) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ onFileUpload }) => {
  return (
    <FileUploader
      supabaseUrl="your-url"
      supabaseAnonKey="your-key"
      bucket="uploads"
      onUploadComplete={onFileUpload}
    />
  );
};
```

## Hooks

### useUpload

For advanced usage, you can use the `useUpload` hook directly:

```tsx
import { useUpload } from '@supafile/upload-widget';

const MyComponent = () => {
  const { files, uploading, uploadFiles, removeFile } = useUpload({
    supabaseUrl: 'your-url',
    supabaseAnonKey: 'your-key',
    bucket: 'uploads'
  });

  return (
    <div>
      {files.map(file => (
        <div key={file.id}>
          {file.name} - {file.size} bytes
        </div>
      ))}
    </div>
  );
};
```

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd supafile/packages/upload-widget

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the package
pnpm build

# Run tests
pnpm test
```

### Project Structure

```
packages/upload-widget/
├── src/
│   ├── components/
│   │   ├── FileUploader.tsx    # Main component
│   │   └── FilePreview.tsx     # File preview component
│   ├── hooks/
│   │   ├── useUpload.ts        # Upload logic hook
│   │   └── index.ts           # Hooks exports
│   ├── index.tsx              # Main exports
│   └── index.css              # Base styles
├── dist/                      # Built files
├── package.json
└── README.md
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `pnpm test`
6. Run linting: `pnpm lint`
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Include tests for new functionality
- Update documentation for API changes
- Ensure all tests pass before submitting

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- [Documentation](https://github.com/your-org/supafile)
- [Issue Tracker](https://github.com/your-org/supafile/issues)
- [Discussions](https://github.com/your-org/supafile/discussions)

## Changelog

### v1.0.0
- Initial release
- Drag & drop file upload
- Supabase integration
- Auto-injected CSS styling
- Comprehensive style props
- TypeScript support
- Full test coverage
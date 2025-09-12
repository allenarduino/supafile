# supafile-react-upload-widget

A modern, self-contained React file upload widget built specifically for Supabase users. Features drag-and-drop support, automatic Supabase storage integration, and beautiful styling out of the box.

![Supafile Demo](https://github.com/allenarduino/supafile/blob/main/demo-screenshot/supafile-demo-screenshot.png)

## Features

- **Secure Supabase Integration** - Pass Supabase client instance (recommended) or credentials
- **Built for Supabase** - Easy integration with Supabase Storage
- **Self-contained styling** - No CSS imports needed
- **Drag & drop support** - Modern file upload experience
- **Auto-injected CSS** - Styling automatically loads
- **Customizable** - Extensive style props and CSS variables
- **Responsive** - Works on all screen sizes
- **TypeScript support** - Full type definitions
- **Tested** - Comprehensive test coverage
- **Zero dependencies** - Lightweight and fast
- **Production-ready** - Secure authentication and error handling

## Installation

```bash
npm install supafile-react-upload-widget
# or
yarn add supafile-react-upload-widget
# or
pnpm add supafile-react-upload-widget
```

## Security Features

This widget prioritizes security and follows Supabase best practices:

- **Secure Client Support** - Pass authenticated Supabase client instances
- **Credential Validation** - Ensures proper authentication setup
- **Production Ready** - Designed for secure production environments
- **Demo Mode** - Direct credentials supported for testing only

## Quick Start

Perfect for Supabase projects! Two ways to use the component:

### Option 1: Pass Supabase Client (Recommended for Production)

```tsx
import { FileUploader } from 'supafile-react-upload-widget';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-supabase-anon-key'
);

function App() {
  return (
    <FileUploader
      supabase={supabase}
      bucket="your-storage-bucket"
      onUploadComplete={(file) => console.log('File uploaded to Supabase:', file)}
      onUploadError={(file, error) => console.error('Upload failed:', error)}
    />
  );
}
```

### Option 2: Pass Credentials Directly (For Demos/Testing Only)

```tsx
import { FileUploader } from 'supafile-react-upload-widget';

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

> **⚠️ Security Note**: Option 2 exposes your Supabase credentials in the frontend code. Use Option 1 (passing a Supabase client) for production applications.

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a storage bucket in your Supabase dashboard
3. Get your credentials from Settings > API
4. Configure RLS policies for your bucket (optional but recommended)

## Props

### Authentication Props (Choose One)

| Prop | Type | Description | Security Level |
|------|------|-------------|----------------|
| `supabase` | `SupabaseClient` | **Recommended**: Your authenticated Supabase client instance | **Production Ready** |
| `supabaseUrl` | `string` | **Demo Only**: Your Supabase project URL | **Testing Only** |
| `supabaseAnonKey` | `string` | **Demo Only**: Your Supabase anonymous/public key | **Testing Only** |

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `bucket` | `string` | Supabase Storage bucket name |

> **Security Note**: You must provide either `supabase` OR both `supabaseUrl` + `supabaseAnonKey`. The `supabase` prop is recommended for production use as it allows for proper authentication and session management.

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
import { FileUploader } from 'supafile-react-upload-widget';

<FileUploader
  supabaseUrl="https://your-project.supabase.co"
      supabaseAnonKey="your-supabase-anon-key"
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
import { FileUploader, type UploadedFile } from 'supafile-react-upload-widget';

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
import { useUpload } from 'supafile-react-upload-widget';

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

## Saving Files to Supabase Database

Here's a straightforward example showing how to use the upload widget and save files to Supabase database:

#### Step 1: Create Database Table

Run this SQL in your Supabase SQL editor:

```sql
-- Create files table
CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Step 2: Use Upload Widget with Database Save

```tsx
import { useState } from 'react';
import { FileUploader, type UploadedFile } from 'supafile-react-upload-widget';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  'your-supabase-url',
  'your-supabase-anon-key'
);

const MyComponent = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  // This function runs when a file is uploaded
  const handleFileUpload = async (file: UploadedFile) => {
    console.log('File uploaded:', file);
    
    // Add to local state
    setFiles(prev => [...prev, file]);
    
    // Save to Supabase database
    try {
      const { data, error } = await supabase
        .from('files')
        .insert({
          name: file.name,
          url: file.url,
          size: file.size
        });

      if (error) throw error;
      console.log('File saved to database:', data);
    } catch (error) {
      console.error('Error saving to database:', error);
    }
  };

  return (
    <div>
      <h1>Upload Files</h1>
      
      {/* Upload Widget */}
      <FileUploader
        supabaseUrl="your-supabase-url"
        supabaseAnonKey="your-supabase-anon-key"
        bucket="uploads"
        onUploadComplete={handleFileUpload}
      />
      
      {/* Display uploaded files */}
      <div>
        <h2>Uploaded Files ({files.length})</h2>
        {files.map(file => (
          <div key={file.id}>
            <p><strong>Name:</strong> {file.name}</p>
            <p><strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB</p>
            <p><strong>URL:</strong> <a href={file.url} target="_blank">{file.url}</a></p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
```

#### Step 3: Load Files from Database

```tsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('your-supabase-url', 'your-supabase-anon-key');

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load files from database
  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading files...</div>;

  return (
    <div>
      <h2>Files from Database ({files.length})</h2>
      {files.map(file => (
        <div key={file.id} className="border p-4 mb-2">
          <p><strong>Name:</strong> {file.name}</p>
          <p><strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB</p>
          <p><strong>URL:</strong> <a href={file.url} target="_blank">{file.url}</a></p>
          <p><strong>Uploaded:</strong> {new Date(file.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default FileList;
```

#### Complete App Example

```tsx
import { useState, useEffect } from 'react';
import { FileUploader, type UploadedFile } from 'supafile-react-upload-widget';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('your-supabase-url', 'your-supabase-anon-key');

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [savedFiles, setSavedFiles] = useState([]);

  // Handle file upload
  const handleUpload = async (file: UploadedFile) => {
    console.log('File uploaded:', file);
    
    // Add to local state
    setUploadedFiles(prev => [...prev, file]);
    
    // Save to database
    try {
      const { data, error } = await supabase
        .from('files')
        .insert({
          name: file.name,
          url: file.url,
          size: file.size
        });

      if (error) throw error;
      console.log('Saved to database:', data);
      
      // Refresh saved files
      loadSavedFiles();
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  // Load files from database
  const loadSavedFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  // Load files on component mount
  useEffect(() => {
    loadSavedFiles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">File Upload with Supabase</h1>
      
      {/* Upload Widget */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload Files</h2>
        <FileUploader
          supabaseUrl="your-supabase-url"
          supabaseAnonKey="your-supabase-anon-key"
          bucket="uploads"
          onUploadComplete={handleUpload}
        />
      </div>

      {/* Recently Uploaded */}
      {uploadedFiles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Recently Uploaded</h2>
          {uploadedFiles.map(file => (
            <div key={file.id} className="border p-3 mb-2 rounded">
              <p><strong>{file.name}</strong> - {(file.size / 1024).toFixed(1)} KB</p>
              <p className="text-sm text-blue-600">{file.url}</p>
            </div>
          ))}
        </div>
      )}

      {/* Files from Database */}
      <div>
        <h2 className="text-lg font-semibold mb-4">All Files ({savedFiles.length})</h2>
        {savedFiles.map(file => (
          <div key={file.id} className="border p-3 mb-2 rounded">
            <p><strong>{file.name}</strong> - {(file.size / 1024).toFixed(1)} KB</p>
            <p className="text-sm text-blue-600">{file.url}</p>
            <p className="text-xs text-gray-500">
              Uploaded: {new Date(file.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
```

#### Key Points:

1. **File Upload**: Use `onUploadComplete` to get file data including URL
2. **Database Save**: Insert file data into Supabase table
3. **File Access**: Query database to get all saved files
4. **File URLs**: Access file URLs from `file.url` property
5. **Real-time Updates**: Refresh database queries after uploads

This simple example shows exactly how to use the upload widget to capture files and save them to Supabase database! 🎯

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

### v1.0.1 - Secure Supabase Client Support
- **NEW**: Added support for passing Supabase client instances (recommended for production)
- **NEW**: Enhanced security with proper authentication handling
- **BREAKING**: Updated TypeScript types for better security
- **NEW**: Comprehensive security documentation and warnings
- **IMPROVED**: Better error handling and validation
- **NEW**: Updated examples to use secure client approach
- **IMPROVED**: Better UI with Lucide React icons
- **IMPROVED**: More compact and responsive design

### v1.0.0
- Initial release
- Drag & drop file upload
- Supabase integration
- Auto-injected CSS styling
- Comprehensive style props
- TypeScript support
- Full test coverage
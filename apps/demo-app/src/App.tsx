import { FileUploader, type UploadedFile } from '@supafile/upload-widget';


const App = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
    <h1 className="text-3xl font-bold mb-6">Supafile Demo</h1>

    {/* Default styling */}
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Default Styling</h2>
      <FileUploader
        supabaseUrl="https://uidoipuefrzslwkqchob.supabase.co"
        supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZG9pcHVlZnJ6c2x3a3FjaG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5NTEwNzEsImV4cCI6MjA3MjUyNzA3MX0.1JZAtgUXQYIESZ3eVT9lLQMh9A-oGxsnrV5Sh1X_VZw"
        bucket="uploads"
        maxFileSize={10 * 1024 * 1024}
        allowedTypes={['image/png', 'image/jpeg', 'application/pdf']}
        onUploadComplete={(file: UploadedFile) => console.log('Uploaded file', file)}
        onUploadError={(file, err) => console.error('Upload error', file.name, err)}
      />
    </div>

    {/* Custom font sizes */}
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Custom Font Sizes</h2>
      <FileUploader
        supabaseUrl="https://uidoipuefrzslwkqchob.supabase.co"
        supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZG9pcHVlZnJ6c2x3a3FjaG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5NTEwNzEsImV4cCI6MjA3MjUyNzA3MX0.1JZAtgUXQYIESZ3eVT9lLQMh9A-oGxsnrV5Sh1X_VZw"
        bucket="uploads"
        maxFileSize={10 * 1024 * 1024}
        allowedTypes={['image/png', 'image/jpeg', 'application/pdf']}
        onUploadComplete={(file: UploadedFile) => console.log('Uploaded file', file)}
        onUploadError={(file, err) => console.error('Upload error', file.name, err)}
        titleSize="1.5rem"
        instructionsSize="1.1rem"
        sizeLimitSize="0.9rem"
        fileNameSize="1rem"
        fileSizeSize="0.8rem"
        buttonSize="0.9rem"
        backgroundColor="#f8fafc"
        borderColor="#3b82f6"
        borderHoverColor="#1d4ed8"
        height="200px"
        minHeight="200px"
      />
    </div>
  </div>
);

export default App;
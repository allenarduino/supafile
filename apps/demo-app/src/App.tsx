import { FileUploader, type UploadedFile } from 'supafile-react-upload-widget';


const App = () => (


  <div className='w-full h-full flex flex-col justify-center items-center'>
    <h1 className='text-2xl font-bold'>Supafile Demo</h1>
    < FileUploader
      supabaseUrl="https://uidoipuefrzslwkqchob.supabase.co"
      supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZG9pcHVlZnJ6c2x3a3FjaG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5NTEwNzEsImV4cCI6MjA3MjUyNzA3MX0.1JZAtgUXQYIESZ3eVT9lLQMh9A-oGxsnrV5Sh1X_VZw"
      bucket="uploads"
      maxFileSize={10 * 1024 * 1024}
      allowedTypes={['image/png', 'image/jpeg', 'application/pdf']}
      onUploadComplete={(file: UploadedFile) => console.log('Uploaded file', file)}
      onUploadError={(file, err) => console.error('Upload error', file.name, err)}
      showFilePreviews={true}
    />
  </div>

);

export default App;
import { FileUploader, type UploadedFile } from '@supafile/upload-widget';


const App = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
    <h1 className="text-3xl font-bold mb-6">Supafile Demo</h1>
    <FileUploader
      supabaseUrl="https://xyz.supabase.co"
      supabaseAnonKey="your-anon-key"
      bucket="uploads"
      maxFileSize={10 * 1024 * 1024}
      allowedTypes={['image/png', 'image/jpeg', 'application/pdf']}
      onUploadComplete={(file: UploadedFile) => console.log('Uploaded file', file)}
      onUploadError={(file, err) => console.error('Upload error', file.name, err)}
      borderColor="red"
      borderHoverColor='blue'
      height='50px'
    />
  </div>
);

export default App;
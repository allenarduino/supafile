import { FileUploader, type UploadedFile } from 'supafile-react-upload-widget';


const App = () => (


  <div className='w-full h-full flex flex-col justify-center items-center'>
    <h1 className='text-2xl font-bold'>Supafile Demo</h1>
    < FileUploader
      supabaseUrl="https://your-project.supabase.co"
      supabaseAnonKey="your-supabase-anon-key"
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
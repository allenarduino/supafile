/// <reference types="vite/client" />

declare module '*.css' {
    const content: string;
    export default content;
}

declare module '@supafile/upload-widget/style' {
    const content: string;
    export default content;
}
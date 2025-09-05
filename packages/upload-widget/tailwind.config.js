/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        // FileUploader component classes
        'w-full', 'max-w-2xl', 'mx-auto', 'bg-white', 'border-2', 'border-dashed',
        'border-gray-300', 'rounded-lg', 'p-8', 'text-center', 'hover:border-gray-400',
        'transition-colors', 'cursor-pointer', 'hidden', 'w-12', 'h-12', 'mx-auto',
        'text-gray-400', 'mb-4', 'text-lg', 'font-medium', 'text-gray-900', 'mb-2',
        'text-gray-500', 'mb-1', 'text-sm', 'text-gray-400', 'mt-4', 'inline-flex',
        'items-center', 'px-4', 'py-2', 'bg-blue-50', 'text-blue-700', 'rounded-lg',
        'animate-spin', 'rounded-full', 'h-4', 'w-4', 'border-b-2', 'border-blue-600',
        'mr-2', 'mt-6', 'space-y-3', 'flex', 'justify-between', 'bg-gray-50', 'p-4',
        'border', 'text-red-500', 'hover:text-red-700', 'font-medium', 'px-3', 'py-1',
        'rounded', 'hover:bg-red-50', 'transition-colors', 'space-x-3', 'w-10', 'h-10',
        'bg-gray-200', 'rounded', 'flex', 'justify-center', 'w-5', 'h-5', 'text-gray-500',
        'flex-1', 'text-left', 'text-gray-900', 'text-xs', 'object-cover'
    ]
};

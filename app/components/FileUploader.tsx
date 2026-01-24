import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
    acceptedTypes?: Record<string, string[]>;
}

const FileUploader = ({ 
    onFileSelect, 
    acceptedTypes = {
        'application/pdf': ['.pdf'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
}: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
        onDrop,
        multiple: false,
        accept: acceptedTypes,
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;
    const rejection = fileRejections[0];

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    {file.type === 'application/pdf' ? (
                                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button 
                                className="p-2 cursor-pointer hover:bg-gray-100 rounded" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                                type="button"
                            >
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ): (
                        <div className="text-center py-8">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                                </svg>
                            </div>
                            <p className="text-lg text-gray-600 mb-2">
                                <span className="font-semibold text-blue-600">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">PDF or DOCX files (max {formatSize(maxFileSize)})</p>
                            
                            {isDragActive && (
                                <div className="absolute inset-0 bg-blue-50 border-2 border-blue-300 border-dashed rounded-lg flex items-center justify-center">
                                    <p className="text-blue-600 font-medium">Drop your resume here</p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {rejection && (
                        <div className="text-red-600 text-sm mt-2">
                            <p>File rejected: {rejection.errors[0]?.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader

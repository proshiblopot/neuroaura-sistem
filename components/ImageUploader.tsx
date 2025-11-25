
import React, { useCallback, useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  image: ImageFile | null;
  onImageSelected: (image: ImageFile | null) => void;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected({
        file,
        previewUrl: URL.createObjectURL(file),
        base64: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;

    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [disabled, processFile]);

  const handleClear = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageSelected]);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (image) {
    return (
      <div className="relative w-full h-96 bg-white overflow-hidden shadow-sm group"
           style={{ borderRadius: '15px', border: '1px solid #E2E8F0' }}>
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <img 
            src={image.previewUrl} 
            alt="Preview" 
            className="w-full h-full object-contain"
            />
        </div>
        
        {!disabled && (
          <div className="absolute top-2 right-2">
             <button 
                onClick={handleClear}
                className="p-2 bg-white text-slate-500 hover:text-red-500 rounded-full shadow-md border border-slate-100 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={!disabled ? triggerUpload : undefined}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full h-80 flex flex-col items-center justify-center text-center p-8 transition-all duration-300
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${isDragging ? 'bg-slate-50 scale-[1.01]' : 'bg-white hover:bg-slate-50'}
      `}
      style={{
        border: '3px dashed #00CED1',
        borderRadius: '15px',
        backgroundColor: isDragging ? '#F8FAFC' : '#FFFFFF'
      }}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
        disabled={disabled}
      />
      
      <div className="mb-6 p-4 rounded-full bg-slate-50">
        <Upload className="w-10 h-10" style={{ color: '#00CED1' }} />
      </div>
      
      <p className="text-lg font-bold text-slate-600 mb-2">
        {isDragging ? 'Відпускайте файл...' : 'Натисніть або перетягніть фото'}
      </p>
      <p className="text-sm text-slate-400 font-medium">
        JPG, PNG до 10MB
      </p>
      <p className="text-sm text-[#4B0082]/70 font-medium mt-1">
        Для діагностики дітей 6-10 років
      </p>
    </div>
  );
};

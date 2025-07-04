import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/app/components/ui/use-toast'
// import { uploadImageToWalrus } from "@/app/lib/sui/utils"
// import Image from 'next/image';

interface ImageUploadProps {
  onChange: (url: string) => void;
  className?: string;
  address: string;
}

export const ImageUpload = ({ onChange, className, address}: ImageUploadProps) => {
  const [value, setValue] = useState("")                                            
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast: toast } = useToast();


  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return; 

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast(
        "Invalid file type",
        // description: "Please select an image file",
        // variant: "destructive",
      );
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast(
        "File too large",
        // description: "Please select an image smaller than 5MB",
        // variant: "destructive",
      );
      return;
    }

    setIsUploading(true);
    try {
      // Convert file to data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        //TODO: logic to upload image to walrus or supabase
        // onChange(dataUrl);
        setValue(dataUrl)
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast(
          "Upload failed",
        //   description: "Failed to process the image",
        //   variant: "destructive",
        );
        setIsUploading(false);
      };
      //upload to walrus
      // const walrusUrl = uploadImageToWalrus(file, address)
      // console.log(walrusUrl)
      reader.readAsDataURL(file);
    } catch (error) {
      toast(
        "Upload failed",
        // description: "Failed to upload image",
        // variant: "destructive",
      );
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <Label className="text-white font-semibold text-base mb-2 block">
        Avatar Image
      </Label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="space-y-3">
        {/* Image Preview */}
        {value && (
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-slate-600 bg-slate-800">
              <img
                src={value}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 bg-slate-900/80 hover:bg-slate-700 text-white rounded-full p-1 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
        
        <div className="flex gap-3">
          <Button
            type="button"
            onClick={handleButtonClick}
            disabled={isUploading}
            className="flex-1 border-slate-600 bg-slate-800 text-white hover:bg-slate-700 focus:border-cyan-500 focus:ring-cyan-500"
            variant="outline"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Choose Image'}
          </Button>
          
          {value && (
            <Button
              type="button"
              onClick={handleRemove}
              variant="outline"
              size="icon"
              className="border-slate-600 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {/* Alternative URL input */}
        <div className="text-center text-slate-500 text-sm">or</div>
        <Input
          type="text"
          placeholder="https://example.com/avatar.jpg"
         value={value.startsWith('data:') ? '' : value}
        //  onChange={(e) => onChange(e.target.value)}
         onBlur={(e) => onChange(e.target.value)}
          className="border-slate-600 bg-slate-800 text-white focus:border-cyan-500 focus:ring-cyan-500 text-base py-3 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};
import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { useUploadImage } from "@/hooks/useCreatePost";
import toast from "react-hot-toast";

interface ImageDropZoneProps {
  imageUrl: string | null;
  onImageChange: (url: string | null) => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const ImageDropZone = ({ imageUrl, onImageChange }: ImageDropZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadImage();

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only JPEG, PNG, and WebP images are allowed";
    }
    if (file.size > MAX_SIZE) {
      return "Image must be under 5MB";
    }
    return null;
  };

  const handleUpload = useCallback(
    (file: File) => {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return;
      }

      uploadMutation.mutate(file, {
        onSuccess: (data) => {
          onImageChange(data.url);
          toast.success("Image uploaded");
        },
        onError: () => {
          toast.error("Failed to upload image");
        },
      });
    },
    [uploadMutation, onImageChange]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleRemove = () => {
    onImageChange(null);
  };


  if (imageUrl) {
    return (
      <div>
        <label className="block text-sm font-medium text-[#F5F5F5] mb-3">
          Image
        </label>
        <div className="relative rounded-xl overflow-hidden border border-[#2A2A2A] group">
          <img
            src={imageUrl}
            alt="Upload preview"
            className="w-full max-h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="p-3 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#F5F5F5] mb-3">
        Image <span className="text-[#555555] font-normal">(optional)</span>
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center py-10 px-6 rounded-xl border-border-default border-dashed cursor-pointer transition-all ${isDragOver
            ? "border-[#E03030] bg-[#E03030]/5"
            : "border-[#2A2A2A] hover:border-[#3A3A4E] bg-[#111111]/50"
          } ${uploadMutation.isPending ? "pointer-events-none opacity-60" : ""}`}
      >
        {uploadMutation.isPending ? (
          <>
            <Loader2 className="w-8 h-8 text-[#E03030] animate-spin mb-3" />
            <p className="text-sm text-[#999999]">Uploading...</p>
          </>
        ) : (
          <>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${isDragOver ? "bg-[#E03030]/20" : "bg-[#1A1A1A]"
              }`}>
              {isDragOver ? (
                <Upload className="w-6 h-6 text-[#E03030]" />
              ) : (
                <ImageIcon className="w-6 h-6 text-[#555555]" />
              )}
            </div>
            <p className="text-sm text-[#999999] mb-1">
              {isDragOver ? "Drop your image here" : "Drag & drop an image, or click to browse"}
            </p>
            <p className="text-xs text-[#555555]">
              JPEG, PNG, or WebP • Max 5MB
            </p>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageDropZone;


import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadHandlerProps {
  onFileSelect: (files: FileList) => void;
  acceptedTypes?: string;
  maxSize?: number;
}

export const FileUploadHandler = ({ 
  onFileSelect, 
  acceptedTypes = ".pdf,.docx,.jpg,.png", 
  maxSize = 10 * 1024 * 1024 
}: FileUploadHandlerProps) => {
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Validate file size
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          toast({
            title: "File too large",
            description: `${files[i].name} exceeds the 10MB limit.`,
            variant: "destructive"
          });
          return;
        }
      }
      onFileSelect(files);
    }
  };

  return (
    <input
      type="file"
      onChange={handleFileChange}
      accept={acceptedTypes}
      multiple
      className="hidden"
      id="file-upload"
    />
  );
};

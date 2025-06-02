
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, X, FileText, Calendar, User } from "lucide-react";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: number;
    name: string;
    type: string;
    uploadDate: string;
    status: string;
    aiExtracted?: any;
  } | null;
}

export const DocumentViewer = ({ isOpen, onClose, document }: DocumentViewerProps) => {
  if (!document) return null;

  const handleDownload = () => {
    // Simulate download
    console.log(`Downloading ${document.name}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle>{document.name}</DialogTitle>
                <DialogDescription>{document.type}</DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={document.status === "processed" ? "default" : "secondary"}>
                {document.status}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Document Details */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Uploaded: {document.uploadDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Uploaded by: John Doe</span>
            </div>
          </div>

          {/* AI Extracted Data */}
          {document.aiExtracted && (
            <div>
              <h3 className="font-semibold text-lg mb-3">AI Extracted Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(document.aiExtracted).map(([key, value]) => (
                  <div key={key} className="p-3 border rounded-lg">
                    <p className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-gray-900">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Preview Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Document Preview</h3>
            <p className="text-gray-500">
              Document preview would be displayed here
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

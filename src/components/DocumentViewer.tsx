
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Calendar, User, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  if (!document) return null;

  const handleDownload = () => {
    console.log("Downloading document:", document.name);
    
    // Create actual download
    const element = document.createElement('a');
    const content = `Document: ${document.name}\nType: ${document.type}\nUploaded: ${document.uploadDate}\nStatus: ${document.status}\n\nAI Extracted Information:\n${JSON.stringify(document.aiExtracted || {}, null, 2)}\n\nThis is the full document content for ${document.name}. In a real application, this would be the actual document content.`;
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = document.name.replace(/\.[^/.]+$/, "") + "_full.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    
    toast({
      title: "Download complete",
      description: `${document.name} has been downloaded successfully.`
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">{document.name}</DialogTitle>
                <DialogDescription className="text-base">{document.type}</DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={document.status === "processed" ? "default" : "secondary"} className="flex items-center space-x-1">
                {document.status === "processed" ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <AlertCircle className="w-3 h-3" />
                )}
                <span>{document.status}</span>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Upload Date</p>
                    <p className="font-medium">{document.uploadDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Uploaded By</p>
                    <p className="font-medium">John Doe</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Document Type</p>
                    <p className="font-medium">{document.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Processing Status</p>
                    <p className="font-medium capitalize">{document.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Extracted Data */}
          {document.aiExtracted && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Extracted Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(document.aiExtracted).map(([key, value]) => (
                    <div key={key} className="p-4 border rounded-lg bg-gray-50">
                      <p className="text-sm font-medium text-gray-600 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-gray-900 font-medium">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Document Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Document Content Preview</h3>
                <p className="text-gray-500 mb-4">
                  {document.name} - {document.type}
                </p>
                <div className="text-left max-w-2xl mx-auto p-4 bg-white border rounded-lg">
                  <h4 className="font-semibold mb-2">Sample Content:</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    This document contains {document.type.toLowerCase()} information that has been processed by our AI system.
                  </p>
                  {document.aiExtracted && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-800">Key Findings:</p>
                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                        {Object.entries(document.aiExtracted).slice(0, 3).map(([key, value]) => (
                          <li key={key}>• {key.replace(/([A-Z])/g, ' $1').trim()}: {String(value)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="mt-4" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

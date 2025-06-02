import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertCircle, Eye, Download } from "lucide-react";
import { FileUploadHandler } from "./FileUploadHandler";
import { DocumentViewer } from "./DocumentViewer";
import { useToast } from "@/hooks/use-toast";

export const DocumentUpload = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files: FileList) => {
    // Simulate upload process
    setIsProcessing(true);
    setUploadProgress(0);
    
    toast({
      title: "Upload started",
      description: `Uploading ${files.length} file(s)...`
    });

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast({
            title: "Upload complete",
            description: "Files uploaded and processed successfully!"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleBrowseFiles = () => {
    document.getElementById('file-upload')?.click();
  };

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setViewerOpen(true);
  };

  const handleDownloadDocument = (document: any) => {
    toast({
      title: "Download started",
      description: `Downloading ${document.name}...`
    });
  };

  const recentUploads = [
    {
      id: 1,
      name: "OSHA_Safety_Inspection_2024.pdf",
      type: "Safety Compliance",
      uploadDate: "2024-06-02 10:30 AM",
      status: "processed",
      aiExtracted: {
        inspectionDate: "2024-05-28",
        violations: 0,
        recommendations: 3
      }
    },
    {
      id: 2,
      name: "Employee_Training_Records.docx",
      type: "Training Documentation",
      uploadDate: "2024-06-01 2:15 PM",
      status: "processing",
      aiExtracted: null
    },
    {
      id: 3,
      name: "HIPAA_Risk_Assessment.pdf",
      type: "Privacy Compliance",
      uploadDate: "2024-05-31 9:45 AM",
      status: "processed",
      aiExtracted: {
        assessmentDate: "2024-05-30",
        riskLevel: "Low",
        actions: 2
      }
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <span>Document Upload</span>
          </CardTitle>
          <CardDescription>
            Upload compliance documents for AI-powered analysis and report generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className={`mx-auto w-12 h-12 mb-4 ${dragActive ? "text-blue-500" : "text-gray-400"}`} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drop your compliance documents here
            </h3>
            <p className="text-gray-500 mb-4">
              Supports PDF, DOCX, JPG, PNG files up to 10MB
            </p>
            <Button variant="outline" className="mb-4" onClick={handleBrowseFiles}>
              Browse Files
            </Button>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
              <Badge variant="outline">OSHA Forms</Badge>
              <Badge variant="outline">HIPAA Documents</Badge>
              <Badge variant="outline">Safety Reports</Badge>
              <Badge variant="outline">Training Records</Badge>
            </div>
          </div>

          <FileUploadHandler onFileSelect={handleFileUpload} />

          {isProcessing && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Processing document...</span>
                <span className="text-sm text-blue-700">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-blue-600 mt-2">
                AI is extracting compliance data and identifying key information
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>AI-processed documents and extracted compliance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{upload.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{upload.type}</span>
                      <span>•</span>
                      <span>{upload.uploadDate}</span>
                    </div>
                    {upload.aiExtracted && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {upload.type === "Safety Compliance" && (
                          <>
                            <Badge variant="secondary" className="text-xs">
                              Inspected: {upload.aiExtracted.inspectionDate}
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              {upload.aiExtracted.violations} Violations
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {upload.aiExtracted.recommendations} Recommendations
                            </Badge>
                          </>
                        )}
                        {upload.type === "Privacy Compliance" && (
                          <>
                            <Badge variant="secondary" className="text-xs">
                              Risk: {upload.aiExtracted.riskLevel}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {upload.aiExtracted.actions} Action Items
                            </Badge>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {upload.status === "processed" ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Processed
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Processing
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleViewDocument(upload)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(upload)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DocumentViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        document={selectedDocument}
      />
    </div>
  );
};

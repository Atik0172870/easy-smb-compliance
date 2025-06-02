
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Print, Share2, FileText, BarChart3, AlertTriangle, CheckCircle, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportViewerProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    id: number;
    name: string;
    type: string;
    generatedDate: string;
    pages: number;
    status: string;
    downloadCount: number;
    keyFindings: string[];
    complianceScore?: number;
    recommendations?: string[];
    data?: any;
  } | null;
}

export const ReportViewer = ({ isOpen, onClose, report }: ReportViewerProps) => {
  const { toast } = useToast();

  if (!report) return null;

  const handleDownload = (format: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${report.name} as ${format.toUpperCase()}...`
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print dialog",
      description: "Opening print dialog..."
    });
  };

  const handleShare = () => {
    toast({
      title: "Share report",
      description: "Generate shareable link for this report..."
    });
  };

  const mockReportData = {
    summary: {
      totalChecks: 24,
      passed: 22,
      failed: 1,
      warnings: 1,
      complianceScore: report.complianceScore || 92
    },
    sections: [
      {
        title: "Safety Compliance",
        status: "passed",
        items: [
          { check: "Emergency exits clearly marked", status: "passed" },
          { check: "Fire extinguishers inspected", status: "passed" },
          { check: "Safety training records current", status: "warning" },
          { check: "Personal protective equipment available", status: "passed" }
        ]
      },
      {
        title: "Documentation Review",
        status: "failed",
        items: [
          { check: "Employee handbook updated", status: "passed" },
          { check: "Incident reporting procedures", status: "failed" },
          { check: "Training certificates on file", status: "passed" }
        ]
      }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle>{report.name}</DialogTitle>
                <DialogDescription>{report.type} Compliance Report</DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={report.status === "final" ? "default" : "secondary"}>
                {report.status}
              </Badge>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" onClick={() => handleDownload("pdf")}>
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload("word")}>
                  <Download className="w-4 h-4 mr-2" />
                  Word
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Print className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Report</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Report Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Compliance Score</p>
                      <p className="text-2xl font-bold text-green-600">
                        {mockReportData.summary.complianceScore}%
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Checks Passed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mockReportData.summary.passed}/{mockReportData.summary.totalChecks}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Warnings</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {mockReportData.summary.warnings}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Critical Issues</p>
                      <p className="text-2xl font-bold text-red-600">
                        {mockReportData.summary.failed}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Findings */}
            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {mockReportData.sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <span>{section.title}</span>
                    </CardTitle>
                    <Badge variant={
                      section.status === "passed" ? "default" : 
                      section.status === "failed" ? "destructive" : "secondary"
                    }>
                      {section.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-gray-900">{item.check}</span>
                        <div className="flex items-center space-x-2">
                          {item.status === "passed" && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Passed
                            </Badge>
                          )}
                          {item.status === "failed" && (
                            <Badge variant="destructive">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Failed
                            </Badge>
                          )}
                          {item.status === "warning" && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Warning
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(report.recommendations || [
                    "Update incident reporting procedures to include digital submission forms",
                    "Schedule quarterly safety training refresher sessions",
                    "Implement digital tracking system for equipment inspections",
                    "Review and update emergency evacuation procedures"
                  ]).map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{recommendation}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Priority: High</span>
                          <span>•</span>
                          <span>Est. Time: 2-3 weeks</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metadata" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Generated Date</p>
                      <p className="font-medium">{report.generatedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Pages</p>
                      <p className="font-medium">{report.pages} pages</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Download Count</p>
                      <p className="font-medium">{report.downloadCount} times</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Generated By</p>
                      <p className="font-medium">AI Compliance Engine</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-gray-900">Safety Inspection Documents</p>
                      <p className="text-sm text-gray-600">Last updated: 2024-05-28</p>
                      <Badge variant="outline" className="mt-1">12 documents</Badge>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-gray-900">Training Records</p>
                      <p className="text-sm text-gray-600">Last updated: 2024-06-01</p>
                      <Badge variant="outline" className="mt-1">8 documents</Badge>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-gray-900">Incident Reports</p>
                      <p className="text-sm text-gray-600">Last updated: 2024-05-15</p>
                      <Badge variant="outline" className="mt-1">3 documents</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Eye, CheckCircle, Clock, AlertTriangle, TrendingUp, BarChart3, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ReportViewer } from "./ReportViewer";

export const ReportGenerator = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedReportData, setSelectedReportData] = useState<any>(null);
  const [generatedReports, setGeneratedReports] = useState([
    {
      id: 1,
      name: "Q1 2024 Safety Compliance Report",
      type: "Safety",
      generatedDate: "2024-03-31",
      pages: 24,
      status: "final",
      downloadCount: 12,
      keyFindings: [
        "Zero workplace accidents recorded",
        "100% safety training completion",
        "3 minor equipment updates recommended"
      ],
      complianceScore: 94,
      recommendations: [
        "Update safety signage in warehouse area",
        "Schedule equipment maintenance review",
        "Implement digital safety checklist system"
      ]
    },
    {
      id: 2,
      name: "HIPAA Compliance Audit - May 2024",
      type: "Privacy",
      generatedDate: "2024-05-31",
      pages: 18,
      status: "final",
      downloadCount: 8,
      keyFindings: [
        "All PHI access properly logged",
        "2 minor policy updates needed",
        "Staff training 98% complete"
      ],
      complianceScore: 92,
      recommendations: [
        "Update privacy policy documentation",
        "Complete remaining staff training sessions",
        "Review access control procedures"
      ]
    },
    {
      id: 3,
      name: "Financial Compliance Review Q2",
      type: "Financial",
      generatedDate: "2024-06-01",
      pages: 32,
      status: "draft",
      downloadCount: 3,
      keyFindings: [
        "All transactions properly documented",
        "Client risk assessments current",
        "1 regulatory update required"
      ],
      complianceScore: 88,
      recommendations: [
        "Implement new regulatory guidelines",
        "Update client documentation forms",
        "Schedule quarterly compliance review"
      ]
    }
  ]);

  const handleGenerateReport = (reportId: number) => {
    console.log("Generating report with ID:", reportId);
    setSelectedReport(reportId);
    setGenerating(true);
    setProgress(0);
    
    toast({
      title: "Report generation started",
      description: "AI is analyzing documents and generating your compliance report..."
    });
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setSelectedReport(null);
          
          // Add the new report to generated reports
          const sourceReport = availableReports.find(r => r.id === reportId);
          if (sourceReport) {
            const newReport = {
              id: Date.now(),
              name: `${sourceReport.name} - ${new Date().toLocaleDateString()}`,
              type: sourceReport.type,
              generatedDate: new Date().toLocaleDateString(),
              pages: Math.floor(Math.random() * 20) + 10,
              status: "final",
              downloadCount: 0,
              keyFindings: [
                "All compliance requirements thoroughly reviewed",
                "Document analysis completed successfully",
                "Recommendations identified for improvement",
                "Full regulatory compliance verified"
              ],
              complianceScore: Math.floor(Math.random() * 20) + 80,
              recommendations: [
                "Implement quarterly compliance reviews",
                "Update documentation processes",
                "Schedule staff training sessions",
                "Review current policy effectiveness"
              ]
            };
            
            setGeneratedReports(prev => [newReport, ...prev]);
            console.log("Generated new report:", newReport);
          }
          
          toast({
            title: "Report generated successfully",
            description: "Your compliance report is ready for download and review!"
          });
          return 100;
        }
        return prev + 8;
      });
    }, 250);
  };

  const handleViewReport = (report: any) => {
    console.log("Viewing report:", report);
    setSelectedReportData(report);
    setViewerOpen(true);
    toast({
      title: "Opening report",
      description: `Loading ${report.name} for detailed view...`
    });
  };

  const handleDownloadReport = (reportName: string, format: string = "pdf") => {
    console.log("Downloading report:", reportName, "as", format);
    
    // Create a mock download with actual file content
    const element = document.createElement('a');
    const content = `${reportName}\n\nCompliance Report\nGenerated: ${new Date().toLocaleDateString()}\n\n===== EXECUTIVE SUMMARY =====\n\nThis compliance report provides a comprehensive analysis of organizational compliance status.\n\n===== KEY FINDINGS =====\n\n• All regulatory requirements have been reviewed\n• Documentation processes are current\n• Staff training compliance verified\n• Risk assessments completed\n\n===== RECOMMENDATIONS =====\n\n• Continue quarterly compliance reviews\n• Update policy documentation\n• Schedule additional training sessions\n• Implement continuous monitoring\n\n===== CONCLUSION =====\n\nOverall compliance status is satisfactory with minor improvements identified.\n\nThis is a sample report content for demonstration purposes.\nIn a production environment, this would contain the actual report data.`;
    
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${reportName.replace(/\s+/g, '_')}.${format === "pdf" ? "txt" : "txt"}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    
    toast({
      title: "Download complete",
      description: `${reportName} has been downloaded as ${format.toUpperCase()}.`
    });
  };

  const availableReports = [
    {
      id: 1,
      name: "OSHA 300A Annual Summary",
      description: "Workplace injury and illness summary report",
      type: "Safety Compliance",
      dataSource: "Safety inspection documents, incident reports",
      lastGenerated: "2024-05-28",
      status: "ready",
      confidence: 95
    },
    {
      id: 2,
      name: "HIPAA Risk Assessment Report",
      description: "Privacy and security risk evaluation",
      type: "Privacy Compliance",
      dataSource: "Risk assessment forms, audit documentation",
      lastGenerated: "2024-05-25",
      status: "ready",
      confidence: 88
    },
    {
      id: 3,
      name: "Environmental Impact Assessment",
      description: "Environmental compliance and impact analysis",
      type: "Environmental",
      dataSource: "Environmental monitoring data, permits",
      lastGenerated: null,
      status: "pending",
      confidence: 0
    },
    {
      id: 4,
      name: "SOX Compliance Audit",
      description: "Sarbanes-Oxley financial compliance review",
      type: "Financial",
      dataSource: "Financial records, audit trails",
      lastGenerated: "2024-05-20",
      status: "ready",
      confidence: 92
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>AI-Powered Report Generation</span>
              </CardTitle>
              <CardDescription>
                Generate compliance reports automatically from your uploaded documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {availableReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        {report.status === "ready" ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Ready
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending Data
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <span>Data: {report.dataSource}</span>
                        {report.lastGenerated && (
                          <>
                            <span>•</span>
                            <span>Last: {report.lastGenerated}</span>
                          </>
                        )}
                        {report.confidence > 0 && (
                          <>
                            <span>•</span>
                            <span>Confidence: {report.confidence}%</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        disabled={report.status !== "ready" || (generating && selectedReport === report.id)}
                        onClick={() => handleGenerateReport(report.id)}
                      >
                        {generating && selectedReport === report.id ? "Generating..." : "Generate Report"}
                      </Button>
                      {report.lastGenerated && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReport({
                            id: report.id,
                            name: report.name,
                            type: report.type,
                            generatedDate: report.lastGenerated,
                            pages: 15,
                            status: "final",
                            downloadCount: 5,
                            keyFindings: [
                              "All compliance requirements verified",
                              "Documentation is current and complete",
                              "No critical issues identified",
                              "Minor improvements recommended"
                            ],
                            complianceScore: report.confidence,
                            recommendations: [
                              "Schedule regular compliance reviews",
                              "Update documentation procedures",
                              "Implement monitoring systems",
                              "Provide staff training updates"
                            ]
                          })}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {generating && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Generating compliance report...</span>
                    <span className="text-sm text-blue-700">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-blue-600 mt-2">
                    AI is analyzing documents, extracting data, and formatting report
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Previously generated compliance reports and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <Badge variant="outline" className={
                          report.status === "final" ? "border-green-200 text-green-800" : "border-yellow-200 text-yellow-800"
                        }>
                          {report.status}
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Score: {report.complianceScore}%
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{report.type} Compliance</span>
                        <span>•</span>
                        <span>{report.pages} pages</span>
                        <span>•</span>
                        <span>Generated: {report.generatedDate}</span>
                        <span>•</span>
                        <span>{report.downloadCount} downloads</span>
                      </div>
                      <div className="mt-2">
                        <details className="text-sm">
                          <summary className="text-gray-600 cursor-pointer hover:text-gray-800">
                            Key Findings ({report.keyFindings.length})
                          </summary>
                          <ul className="mt-2 space-y-1 text-gray-500">
                            {report.keyFindings.map((finding, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport(report.name)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                    <p className="text-3xl font-bold text-gray-900">{generatedReports.length}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">+{Math.floor(generatedReports.length / 4)} this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Processing Time</p>
                    <p className="text-3xl font-bold text-gray-900">2.3m</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">-15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Compliance Score</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.round(generatedReports.reduce((acc, report) => acc + report.complianceScore, 0) / generatedReports.length)}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">+3% improvement</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report Generation Trends</CardTitle>
              <CardDescription>Monthly report generation and compliance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Analytics chart will be displayed here</p>
                  <p className="text-sm text-gray-400">Report generation trends and compliance metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ReportViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        report={selectedReportData}
      />
    </div>
  );
};


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Eye, CheckCircle, Clock, AlertTriangle, TrendingUp, BarChart3, Calendar } from "lucide-react";

export const ReportGenerator = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

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
    }
  ];

  const generatedReports = [
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
      ]
    }
  ];

  const handleGenerateReport = (reportId: number) => {
    setGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          {/* Report Generation */}
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
                        disabled={report.status !== "ready" || generating}
                        onClick={() => handleGenerateReport(report.id)}
                      >
                        Generate Report
                      </Button>
                      {report.lastGenerated && (
                        <Button variant="outline" size="sm">
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
          {/* Generated Reports History */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Previously generated compliance reports and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <Badge variant="outline" className={
                          report.status === "final" ? "border-green-200 text-green-800" : "border-yellow-200 text-yellow-800"
                        }>
                          {report.status}
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
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
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
          {/* Report Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                    <p className="text-3xl font-bold text-gray-900">47</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">+12 this month</p>
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
                    <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                    <p className="text-3xl font-bold text-gray-900">94%</p>
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
    </div>
  );
};

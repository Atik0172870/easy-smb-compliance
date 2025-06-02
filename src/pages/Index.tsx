
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Shield, Bell, BarChart3, Users, CheckCircle, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import { DocumentUpload } from "@/components/DocumentUpload";
import { ComplianceTemplates } from "@/components/ComplianceTemplates";
import { Dashboard } from "@/components/Dashboard";
import { ReportGenerator } from "@/components/ReportGenerator";
import { Settings } from "@/components/Settings";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSettingsClick = () => {
    setActiveTab("settings");
  };

  const handleReviewNotification = (notificationType: string) => {
    toast({
      title: "Review started",
      description: `Opening ${notificationType} for review...`
    });
  };

  const handlePrepareNotification = (notificationType: string) => {
    toast({
      title: "Preparation started",
      description: `Preparing ${notificationType}...`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ComplianceAI</h1>
                <p className="text-sm text-gray-500">Automated Compliance for SMBs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active Plan: Pro
              </Badge>
              <Button variant="outline" size="sm" onClick={handleSettingsClick}>
                Settings
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="upload">
            <DocumentUpload />
          </TabsContent>

          <TabsContent value="templates">
            <ComplianceTemplates />
          </TabsContent>

          <TabsContent value="reports">
            <ReportGenerator />
          </TabsContent>

          <TabsContent value="notifications">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span>Compliance Notifications</span>
                  </CardTitle>
                  <CardDescription>
                    Stay on top of deadlines and compliance requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">OSHA 300A Report Overdue</p>
                        <p className="text-sm text-red-700">Due: March 1, 2024</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleReviewNotification("OSHA 300A Report")}
                    >
                      Review
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">HIPAA Risk Assessment</p>
                        <p className="text-sm text-yellow-700">Due in 7 days</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePrepareNotification("HIPAA Risk Assessment")}
                    >
                      Prepare
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Safety Training Documentation</p>
                        <p className="text-sm text-green-700">Completed on time</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

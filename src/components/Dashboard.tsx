
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Clock, TrendingUp, FileText, Users, Shield, Calendar } from "lucide-react";

export const Dashboard = () => {
  const complianceHealth = 87;
  
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Compliance Health</p>
                <p className="text-3xl font-bold text-green-900">{complianceHealth}%</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={complianceHealth} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents Processed</p>
                <p className="text-3xl font-bold text-gray-900">142</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+23 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">2 admin, 6 members</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                <p className="text-3xl font-bold text-gray-900">34</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">12 pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest compliance actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">OSHA Safety Report uploaded</p>
                <p className="text-sm text-gray-500">Construction site inspection documentation</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Processed
              </Badge>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">HIPAA Compliance Report generated</p>
                <p className="text-sm text-gray-500">Patient privacy assessment completed</p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Ready
              </Badge>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Financial audit documents pending</p>
                <p className="text-sm text-gray-500">Q4 compliance review in progress</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                In Review
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Upcoming Deadlines</span>
            </CardTitle>
            <CardDescription>Don't miss critical compliance dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-medium text-red-900">OSHA 300A Annual Report</p>
              <p className="text-sm text-red-700">Due: March 1, 2024</p>
              <p className="text-xs text-gray-500">3 days overdue</p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-medium text-yellow-900">Safety Training Update</p>
              <p className="text-sm text-yellow-700">Due: June 15, 2024</p>
              <p className="text-xs text-gray-500">7 days remaining</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium text-blue-900">GDPR Data Review</p>
              <p className="text-sm text-blue-700">Due: July 1, 2024</p>
              <p className="text-xs text-gray-500">23 days remaining</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium text-green-900">Fire Safety Inspection</p>
              <p className="text-sm text-green-700">Due: August 30, 2024</p>
              <p className="text-xs text-gray-500">2 months remaining</p>
            </div>

            <Button className="w-full mt-4" variant="outline">
              View All Deadlines
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Risk Assessment</span>
          </CardTitle>
          <CardDescription>Areas requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-900">High Risk</h4>
              <p className="text-2xl font-bold text-red-800 mt-2">2</p>
              <p className="text-sm text-red-700">Overdue compliance items</p>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900">Medium Risk</h4>
              <p className="text-2xl font-bold text-yellow-800 mt-2">5</p>
              <p className="text-sm text-yellow-700">Due within 30 days</p>
            </div>

            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Low Risk</h4>
              <p className="text-2xl font-bold text-green-800 mt-2">18</p>
              <p className="text-sm text-green-700">On track and compliant</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

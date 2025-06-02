import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Search, Building2, Heart, Scale, DollarSign, Plus, Download, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ComplianceTemplates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedComplexity, setSelectedComplexity] = useState("All Levels");

  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Template loaded",
      description: `${templateName} template is now ready for use.`
    });
  };

  const handleDownloadTemplate = (templateName: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${templateName} template...`
    });
  };

  const handleEditTemplate = (templateName: string) => {
    toast({
      title: "Template editor",
      description: `Opening ${templateName} in template editor...`
    });
  };

  const handleCreateCustomTemplate = () => {
    toast({
      title: "Template builder",
      description: "Opening custom template builder..."
    });
  };

  const templates = [
    {
      id: 1,
      name: "OSHA 300A Annual Summary",
      description: "Workplace injury and illness summary report required by OSHA",
      industry: "Construction",
      icon: Building2,
      color: "bg-orange-100 text-orange-800",
      complexity: "Medium",
      estimatedTime: "15 minutes",
      fields: 12,
      lastUpdated: "2024-05-15"
    },
    {
      id: 2,
      name: "HIPAA Risk Assessment",
      description: "Privacy and security risk evaluation for healthcare practices",
      industry: "Healthcare",
      icon: Heart,
      color: "bg-red-100 text-red-800",
      complexity: "High",
      estimatedTime: "30 minutes",
      fields: 24,
      lastUpdated: "2024-05-20"
    },
    {
      id: 3,
      name: "Client Data Protection (GDPR)",
      description: "Data protection impact assessment for legal practices",
      industry: "Legal",
      icon: Scale,
      color: "bg-blue-100 text-blue-800",
      complexity: "High",
      estimatedTime: "45 minutes",
      fields: 18,
      lastUpdated: "2024-05-10"
    },
    {
      id: 4,
      name: "SEC Investment Advisor Compliance",
      description: "Annual compliance review for financial advisory firms",
      industry: "Financial",
      icon: DollarSign,
      color: "bg-green-100 text-green-800",
      complexity: "High",
      estimatedTime: "60 minutes",
      fields: 32,
      lastUpdated: "2024-05-25"
    },
    {
      id: 5,
      name: "Workplace Safety Training Record",
      description: "Employee safety training documentation and certification tracking",
      industry: "All Industries",
      icon: Building2,
      color: "bg-purple-100 text-purple-800",
      complexity: "Low",
      estimatedTime: "10 minutes",
      fields: 8,
      lastUpdated: "2024-06-01"
    },
    {
      id: 6,
      name: "Environmental Compliance Report",
      description: "Environmental impact and waste management compliance documentation",
      industry: "Construction",
      icon: Building2,
      color: "bg-orange-100 text-orange-800",
      complexity: "Medium",
      estimatedTime: "25 minutes",
      fields: 16,
      lastUpdated: "2024-05-18"
    }
  ];

  const industries = ["All Industries", "Construction", "Healthcare", "Legal", "Financial"];
  const complexityLevels = ["All Levels", "Low", "Medium", "High"];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All Industries" || template.industry === selectedIndustry;
    const matchesComplexity = selectedComplexity === "All Levels" || template.complexity === selectedComplexity;
    
    return matchesSearch && matchesIndustry && matchesComplexity;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Compliance Templates</span>
              </CardTitle>
              <CardDescription>
                Pre-built templates for industry-specific compliance requirements
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateCustomTemplate}>
              <Plus className="w-4 h-4 mr-2" />
              Create Custom Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
              >
                {complexityLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${template.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {template.industry}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {template.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Complexity</p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        template.complexity === "Low" ? "bg-green-100 text-green-800" :
                        template.complexity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}
                    >
                      {template.complexity}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">Est. Time</p>
                    <p className="font-medium text-gray-900">{template.estimatedTime}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Fields</p>
                    <p className="font-medium text-gray-900">{template.fields} fields</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Updated</p>
                    <p className="font-medium text-gray-900">{template.lastUpdated}</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    onClick={() => handleUseTemplate(template.name)}
                  >
                    Use Template
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadTemplate(template.name)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditTemplate(template.name)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or create a custom template
            </p>
            <Button onClick={handleCreateCustomTemplate}>
              <Plus className="w-4 h-4 mr-2" />
              Create Custom Template
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-dashed border-2">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Create Custom Template</h3>
          <p className="text-gray-500 mb-4">
            Build your own compliance template with our drag-and-drop builder
          </p>
          <Button variant="outline" onClick={handleCreateCustomTemplate}>
            Start Building
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

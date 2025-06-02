
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, Eye, FileText, Calendar, User, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemplateBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  template?: any;
  mode: "create" | "edit" | "use";
}

export const TemplateBuilder = ({ isOpen, onClose, template, mode }: TemplateBuilderProps) => {
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState(template?.name || "");
  const [templateDescription, setTemplateDescription] = useState(template?.description || "");
  const [selectedIndustry, setSelectedIndustry] = useState(template?.industry || "All Industries");
  const [fields, setFields] = useState(template?.fields || []);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const fieldTypes = [
    { type: "text", icon: FileText, label: "Text Input" },
    { type: "textarea", icon: FileText, label: "Text Area" },
    { type: "date", icon: Calendar, label: "Date" },
    { type: "number", icon: Hash, label: "Number" },
    { type: "select", icon: User, label: "Dropdown" }
  ];

  const industries = ["All Industries", "Construction", "Healthcare", "Legal", "Financial"];

  const addField = (type: string) => {
    const newField = {
      id: Date.now(),
      type,
      label: `New ${type} field`,
      required: false,
      options: type === "select" ? ["Option 1", "Option 2"] : undefined
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: number, property: string, value: any) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, [property]: value } : field
    ));
  };

  const removeField = (id: number) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSave = () => {
    if (mode === "create" || mode === "edit") {
      toast({
        title: mode === "create" ? "Template created" : "Template updated",
        description: `${templateName} has been ${mode === "create" ? "created" : "updated"} successfully.`
      });
    } else if (mode === "use") {
      // Validate required fields
      const missingFields = fields.filter(field => field.required && !formData[field.id]);
      if (missingFields.length > 0) {
        toast({
          title: "Missing required fields",
          description: "Please fill in all required fields before submitting.",
          variant: "destructive"
        });
        return;
      }
      toast({
        title: "Template submitted",
        description: "Your compliance form has been submitted successfully."
      });
    }
    onClose();
  };

  const renderFieldEditor = (field: any) => (
    <Card key={field.id} className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Input
            value={field.label}
            onChange={(e) => updateField(field.id, "label", e.target.value)}
            placeholder="Field label"
            className="flex-1 mr-2"
          />
          <Button variant="destructive" size="sm" onClick={() => removeField(field.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{field.type}</Badge>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(field.id, "required", e.target.checked)}
            />
            <span className="text-sm">Required</span>
          </label>
        </div>
        {field.type === "select" && (
          <div>
            <p className="text-sm font-medium mb-2">Options:</p>
            {field.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 mb-1">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...field.options];
                    newOptions[index] = e.target.value;
                    updateField(field.id, "options", newOptions);
                  }}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newOptions = field.options.filter((_: any, i: number) => i !== index);
                    updateField(field.id, "options", newOptions);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateField(field.id, "options", [...field.options, "New option"])}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Option
            </Button>
          </div>
        )}
      </div>
    </Card>
  );

  const renderFormField = (field: any) => {
    const value = formData[field.id] || "";
    const onChange = (value: string) => setFormData({ ...formData, [field.id]: value });

    return (
      <div key={field.id} className="space-y-2">
        <label className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.type === "text" && (
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
        {field.type === "textarea" && (
          <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
        )}
        {field.type === "date" && (
          <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} />
        )}
        {field.type === "number" && (
          <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
        )}
        {field.type === "select" && (
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select an option</option>
            {field.options?.map((option: string, index: number) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" && "Create Custom Template"}
            {mode === "edit" && `Edit Template: ${template?.name}`}
            {mode === "use" && `Fill Template: ${template?.name}`}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" && "Build a custom compliance template with drag-and-drop fields"}
            {mode === "edit" && "Modify the template structure and fields"}
            {mode === "use" && "Fill out the compliance form based on this template"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {(mode === "create" || mode === "edit") && (
            <>
              {/* Template Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Template Name</label>
                  <Input
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Industry</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Describe what this template is for"
                />
              </div>

              {/* Field Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Fields</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {fieldTypes.map((fieldType) => {
                      const IconComponent = fieldType.icon;
                      return (
                        <Button
                          key={fieldType.type}
                          variant="outline"
                          className="h-20 flex-col space-y-1"
                          onClick={() => addField(fieldType.type)}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-xs">{fieldType.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Fields Editor */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Template Fields ({fields.length})</h3>
                {fields.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-gray-500">No fields added yet. Add fields using the buttons above.</p>
                  </Card>
                ) : (
                  fields.map(renderFieldEditor)
                )}
              </div>
            </>
          )}

          {mode === "use" && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">{template?.description}</h3>
                <p className="text-sm text-blue-700 mt-1">Industry: {template?.industry}</p>
              </div>
              {fields.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">This template has no fields to fill out.</p>
                </Card>
              ) : (
                fields.map(renderFormField)
              )}
            </div>
          )}

          {/* Preview */}
          {(mode === "create" || mode === "edit") && fields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="p-2 border border-gray-200 rounded text-sm text-gray-500">
                      {field.type} field preview
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {mode === "create" && "Create Template"}
            {mode === "edit" && "Save Changes"}
            {mode === "use" && "Submit Form"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { useState } from "react";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

type ApprovalRule = {
  id: string;
  manager: string;
  approvers: string[];
  managerIsApprover: boolean;
  minApprovalPercentage: number;
};

const initialRules: ApprovalRule[] = [
  {
    id: "1",
    manager: "John Smith",
    approvers: ["Sarah Johnson", "David Wilson"],
    managerIsApprover: true,
    minApprovalPercentage: 60,
  },
  {
    id: "2",
    manager: "David Wilson",
    approvers: ["Sarah Johnson"],
    managerIsApprover: false,
    minApprovalPercentage: 100,
  },
];

export function ApprovalRules() {
  const [rules, setRules] = useState<ApprovalRule[]>(initialRules);
  const [selectedManager, setSelectedManager] = useState("");
  const [approvers, setApprovers] = useState<string[]>([]);
  const [managerIsApprover, setManagerIsApprover] = useState(false);
  const [minPercentage, setMinPercentage] = useState("60");

  const availableManagers = ["John Smith", "David Wilson", "Sarah Johnson"];
  const availableApprovers = ["Sarah Johnson", "David Wilson", "Michael Brown", "Emily Davis"];

  const handleAddApprover = (approver: string) => {
    if (!approvers.includes(approver)) {
      setApprovers([...approvers, approver]);
    }
  };

  const handleRemoveApprover = (approver: string) => {
    setApprovers(approvers.filter(a => a !== approver));
  };

  const handleSaveRule = () => {
    if (selectedManager && (approvers.length > 0 || managerIsApprover)) {
      const newRule: ApprovalRule = {
        id: Date.now().toString(),
        manager: selectedManager,
        approvers,
        managerIsApprover,
        minApprovalPercentage: parseInt(minPercentage) || 60,
      };
      setRules([...rules, newRule]);
      
      // Reset form
      setSelectedManager("");
      setApprovers([]);
      setManagerIsApprover(false);
      setMinPercentage("60");
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Approval Rules for Expenses</h2>
        <p className="text-muted-foreground mt-1">
          Configure approval workflows for expense submissions
        </p>
      </div>

      <Card className="shadow-md border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardTitle>Create New Approval Rule</CardTitle>
          <CardDescription>
            Define who needs to approve expenses for each manager
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="manager">Select Manager</Label>
            <Select value={selectedManager} onValueChange={setSelectedManager}>
              <SelectTrigger id="manager">
                <SelectValue placeholder="Choose a manager" />
              </SelectTrigger>
              <SelectContent>
                {availableManagers.map((manager) => (
                  <SelectItem key={manager} value={manager}>
                    {manager}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <Checkbox
              id="manager-approver"
              checked={managerIsApprover}
              onCheckedChange={(checked) => setManagerIsApprover(checked as boolean)}
            />
            <label
              htmlFor="manager-approver"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Manager can approve their own expenses
            </label>
          </div>

          <div className="space-y-3">
            <Label>Additional Approvers</Label>
            <div className="flex gap-2">
              <Select onValueChange={handleAddApprover}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add an approver" />
                </SelectTrigger>
                <SelectContent>
                  {availableApprovers.map((approver) => (
                    <SelectItem key={approver} value={approver}>
                      {approver}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="icon"
                className="shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {approvers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {approvers.map((approver) => (
                  <Badge 
                    key={approver} 
                    variant="secondary"
                    className="px-3 py-1.5 flex items-center gap-2"
                  >
                    {approver}
                    <button
                      onClick={() => handleRemoveApprover(approver)}
                      className="hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="percentage">Minimum Approval Percentage (%)</Label>
            <Input
              id="percentage"
              type="number"
              min="0"
              max="100"
              value={minPercentage}
              onChange={(e) => setMinPercentage(e.target.value)}
              placeholder="60"
            />
            <p className="text-sm text-muted-foreground">
              Percentage of approvers that must approve before expense is finalized
            </p>
          </div>

          <Button 
            onClick={handleSaveRule}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-md"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Save Rule
          </Button>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4">Existing Approval Rules</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {rules.map((rule) => (
            <Card key={rule.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{rule.manager}</CardTitle>
                    <CardDescription>Manager's approval rule</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Approvers:</p>
                  <div className="flex flex-wrap gap-2">
                    {rule.managerIsApprover && (
                      <Badge variant="default" className="bg-green-500">
                        {rule.manager} (Self)
                      </Badge>
                    )}
                    {rule.approvers.map((approver) => (
                      <Badge key={approver} variant="secondary">
                        {approver}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Min. Approval:</span>
                  <Badge variant="outline" className="bg-blue-50">
                    {rule.minApprovalPercentage}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

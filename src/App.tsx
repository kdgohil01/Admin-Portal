import { useState } from "react";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { UserManagement } from "./components/UserManagement";
import { ApprovalRules } from "./components/ApprovalRules";
import { DashboardOverview } from "./components/DashboardOverview";
import { ExpensesOverview } from "./components/ExpensesOverview";

export default function App() {
  const [activeTab, setActiveTab] = useState("Users & Roles");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardOverview />;
      case "Users & Roles":
        return <UserManagement />;
      case "Approval Rules":
        return <ApprovalRules />;
      case "Expenses Overview":
        return <ExpensesOverview />;
      case "Settings":
        return (
          <div className="space-y-4">
            <h2>Settings</h2>
            <p className="text-muted-foreground">Configure your system preferences and settings.</p>
          </div>
        );
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TopNav />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      <footer className="border-t border-border bg-white py-4 px-6 text-center text-sm text-muted-foreground mt-12">
        Expense Manager © 2025 – Secure Expense Tracking
      </footer>
    </div>
  );
}

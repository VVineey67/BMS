import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";

import About from "./pages/About";
import Profile from "./pages/Profile";

// =====================
// NEW: 3D VIEW PAGE
// =====================
import View3D from "./pages/Model";

// =====================
// Dashboard Main Page
// =====================
import Dashboard from "./pages/Dashboard";

// =====================
// CONFIDENTIAL SUB PAGES
// =====================
import LOA from "./pages/confidential/LOA";
import BOQ from "./pages/confidential/BOQ";
import Drawings from "./pages/confidential/Drawings";
import RABills from "./pages/confidential/RABills";

// =====================
// FINANCE SUB PAGES
// =====================
import SiteExpense from "./pages/Finance/SiteExpense";
import PettyCash from "./pages/Finance/PettyCash";
import BillsDocs from "./pages/Finance/BillsDocs";

// =====================
// WORK ACTIVITY SUB PAGES
// =====================
import ExecutionPlan from "./pages/WorkActivity/ExecutionPlan";
import MSPPlan from "./pages/WorkActivity/MSPPlan";

// =====================
// MANPOWER SUB PAGES
// =====================
import DailyManpower from "./pages/Manpower/DailyManpower";
import AllRecord from "./pages/Manpower/AllRecord";

// =====================
// STORE SUB PAGES
// =====================
import ReceivedRecord from "./pages/Store/ReceivedRecord";
import LocalPurchase from "./pages/Store/LocalPurchase";
import ConsumptionRecord from "./pages/Store/ConsumptionRecord";
import StockAvailable from "./pages/Store/StockAvailable";
import GRNDocs from "./pages/Store/GRNDocs";

// =====================
// PROCUREMENT SUB PAGES
// =====================
import PaymentRequest from "./pages/Procurement/PaymentRequest";
import PurchaseRequest from "./pages/Procurement/PurchaseRequest";
import OrderRecord from "./pages/Procurement/OrderRecord";

// =====================
// IMAGES SUB PAGES
// =====================
import AllImages from "./pages/Images/AllImages";
import CompareImages from "./pages/Images/CompareImages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setActiveTab("about");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setSelectedProject(null);
    setActiveTab("about");
  };

  useEffect(() => {
    if (activeTab === "about") setSelectedProject(null);
  }, [activeTab]);

  // =====================================================
  //                ROUTING LOGIC
  // =====================================================
  const renderPage = () => {
    if (activeTab === "about") return <About />;
    if (activeTab === "profile") return <Profile />;

    if (!selectedProject) {
      return (
        <div className="flex min-h-screen items-center justify-center p-10 bg-[#f8fafc]">
          <div className="bg-white p-20 rounded-[3rem] shadow-sm border border-slate-100 flex items-center justify-center w-full max-w-4xl">
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-center">
              Please select a project first
            </p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "dashboard":
        return <Dashboard project={selectedProject} />;

      case "view_3d":
        return <View3D project={selectedProject} />;

      case "confidential_loa":
        return <LOA project={selectedProject} />;
      case "confidential_boq":
        return <BOQ project={selectedProject} />;
      case "confidential_drawings":
        return <Drawings project={selectedProject} />;
      case "confidential_ra_bills":
        return <RABills project={selectedProject} />;

      case "finance_site_expense":
        return <SiteExpense project={selectedProject} />;
      case "finance_petty_cash":
        return <PettyCash project={selectedProject} />;
      case "finance_bills_docs":
        return <BillsDocs project={selectedProject} />;

      case "work_execution_plan":
        return <ExecutionPlan project={selectedProject} />;
      case "work_msp_plan":
        return <MSPPlan project={selectedProject} />;

      case "manpower_daily_manpower":
        return <DailyManpower project={selectedProject} />;
      case "manpower_all_record":
        return <AllRecord project={selectedProject} />;

      case "store_received_record":
        return <ReceivedRecord project={selectedProject} />;
      case "store_local_purchase":
        return <LocalPurchase project={selectedProject} />;
      case "store_consumption_record":
        return <ConsumptionRecord project={selectedProject} />;
      case "store_stock_available":
        return <StockAvailable project={selectedProject} />;
      case "store_grn_docs":
        return <GRNDocs project={selectedProject} />;

      case "procurement_payment_request":
        return <PaymentRequest project={selectedProject} />;
      case "procurement_purchase_request":
        return <PurchaseRequest project={selectedProject} />;
      case "procurement_order_record":
        return <OrderRecord project={selectedProject} />;

      case "images_all_images":
        return <AllImages project={selectedProject} />;
      case "images_compare_images":
        return <CompareImages project={selectedProject} />;

      default:
        return (
          <div className="flex min-h-screen items-center justify-center text-slate-400 font-bold text-xl uppercase tracking-widest">
            Page not created yet: {activeTab}
          </div>
        );
    }
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        onLogout={handleLogout}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* MAIN CONTENT AREA */}
      <div
        className="flex-1 flex flex-col transition-all duration-300 min-h-screen"
        style={{ marginLeft: isCollapsed ? "80px" : "240px" }}
      >
        <main className="flex-1 w-full min-h-screen overflow-auto relative">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;

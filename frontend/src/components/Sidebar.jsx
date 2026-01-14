import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Store,ShieldCheck,
  Image as ImageIcon, LogOut, Briefcase,
  ChevronDown, ChevronLeft, ChevronRight, Info, Search,
  Box, CalendarCheck,IndianRupee,ClipboardList,Boxes,// 3D icon ke liye import kiya
} from "lucide-react";

const Sidebar = ({
  activeTab = "dashboard",
  setActiveTab,
  selectedProject,
  setSelectedProject,
  isCollapsed,
  setIsCollapsed,
  onLogout,
  userName = "Jitendar Goyal",
  profileImage,
}) => {
  const [openSub, setOpenSub] = useState(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");

  const projects = [
    "B-47", "GDLV", "BHA", "SLH", "HIH", "RWH",
    "JEX", "SBGM", "HKD", "RSTF", "VRI", "JANPURAEXT"
  ];

  const menuConfig = [
    { id: "about", label: "Team Bootes", icon: Info },
    // UPDATE: ID ko "view_3d" kiya taaki App.jsx switch case match ho
    { id: "view_3d", label: "3D View", icon: Box }, 
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "confidential", label: "Confidential", icon: ShieldCheck, sub: ["LOA", "BOQ", "Drawings", "RA Bills"] },
    { id: "finance", label: "Finance", icon: IndianRupee, sub: ["Site Expense", "Petty Cash", "Bills Docs"] },
    { id: "work", label: "Work Activity", icon: Briefcase, sub: ["Execution Plan", "MSP Plan"] },
    { id: "Staff", label: "Staff Attendance", icon: CalendarCheck, sub: ["Today Attendace", "All Record"] },
    { id: "manpower", label: "Manpower", icon: Users, sub: ["Daily Manpower", "All Record"] },
    { id: "store", label: "Store", icon: Store, sub: ["Received Record", "Local Purchase", "Consumption Record", "Stock Available", "GRN Docs"] },
    { id: "procurement", label: "Procurement", icon: ClipboardList, sub: ["Payment Request", "Purchase Request", "Order Record"] },
    { id: "images", label: "Images", icon: ImageIcon, sub: ["All Images", "Compare Images"] },
    
  ];

  const toggleSub = (id) => {
    if (isCollapsed) return;
    setOpenSub(openSub === id ? null : id);
  };

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "260px" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen z-999 bg-[#0b1022] text-white flex flex-col border-r border-white/10"
    >
      {/* HEADER */}
      <div className="h-20 flex items-center px-4 shrink-0 relative border-b border-white/10">
        <div className="flex items-center gap-3 w-full">
          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <img src="/logo.png" className="h-7 w-7 object-contain" alt="Logo" />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap overflow-hidden">
              <p className="text-white font-bold tracking-tight text-lg leading-tight">BOOTES</p>
              <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Monitoring System</p>
            </motion.div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-2.5 bg-[#0b1022] border border-white/10 rounded-full p-1 text-white/50 hover:text-white transition-all z-[1000] shadow-md"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 px-2 py-4 overflow-y-auto custom-scrollbar">
        
        {/* PROJECT SELECTOR */}
        {!isCollapsed && (
          <div className="mb-4 px-1">
            <div className="flex flex-col bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all duration-300">
              <button
                onClick={() => setProjectOpen(!projectOpen)}
                className="w-full flex justify-between items-center px-3 py-2.5 text-sm hover:bg-white/5 transition-all"
              >
                <span className="truncate text-slate-200 font-medium">{selectedProject || "Select Project"}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${projectOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {projectOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#0b1022]/50"
                  >
                    <div className="p-2 border-t border-white/10 flex items-center gap-2">
                      <Search size={14} className="text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search Project..."
                        className="bg-transparent text-xs outline-none w-full text-white placeholder:text-slate-600"
                        onChange={(e) => setProjectSearch(e.target.value.toLowerCase())}
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto p-1 custom-scrollbar border-t border-white/5">
                      {projects.filter(p => p.toLowerCase().includes(projectSearch)).map((p) => (
                        <div
                          key={p}
                          onClick={() => { setSelectedProject(p); setProjectOpen(false); }}
                          className={`px-3 py-2 text-xs rounded-md cursor-pointer transition-colors mb-0.5 ${
                            selectedProject === p ? "bg-blue-600 text-white font-bold" : "hover:bg-white/10 text-slate-300"
                          }`}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* NAVIGATION MENU */}
        <div className="space-y-1.5">
          {menuConfig.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab.startsWith(item.id);
            const isSubOpen = openSub === item.id;

            return (
              <div key={item.id} className="relative group flex flex-col items-center">
                <button
                  onClick={() => {
                    if (item.sub && !isCollapsed) setOpenSub(isSubOpen ? null : item.id);
                    else setActiveTab(item.id);
                  }}
                  className={`w-full flex items-center transition-all duration-200 rounded-xl
                    ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}
                    ${isActive 
                      ? "bg-white text-slate-900 font-bold shadow-lg" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="ml-4 flex flex-1 items-center justify-between overflow-hidden">
                      <span className="text-sm tracking-wide truncate">{item.label}</span>
                      {item.sub && <ChevronDown size={14} className={`transition-transform duration-300 ${isSubOpen ? "rotate-180" : "opacity-40"}`} />}
                    </div>
                  )}
                </button>

                {/* TOOLTIP */}
                {isCollapsed && (
                  <div className="fixed left-[85px] px-3 py-2 bg-slate-800 text-white text-[13px] font-medium rounded-md shadow-2xl border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all pointer-events-none z-[9999]">
                    {item.label}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-white/10" />
                  </div>
                )}

                {/* SUB MENU */}
                <AnimatePresence>
                  {!isCollapsed && item.sub && isSubOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="w-full overflow-hidden mt-1 border-l border-white/10 ml-5 pl-4 space-y-0.5"
                    >
                      {item.sub.map((sub) => {
                        const subId = `${item.id}_${sub.toLowerCase().replace(/ /g, "_")}`;
                        return (
                          <button
                            key={sub}
                            onClick={() => setActiveTab(subId)}
                            className={`w-full text-left py-2 text-[13px] transition-all rounded-r-md
                              ${activeTab === subId ? "text-white font-bold bg-white/5" : "text-slate-500 hover:text-slate-200 hover:bg-white/5"}`}
                          >
                            {sub}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-4 mt-auto border-t border-white/10 bg-[#0b1022] flex-shrink-0">
        <div 
          onClick={() => setActiveTab("profile")}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-all group relative"
        >
          <div className="relative flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white border border-white/10 overflow-hidden">
              {profileImage ? <img src={profileImage} alt="Profile" className="h-full w-full object-cover" /> : userInitial}
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-[#0b1022] rounded-full" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-100 leading-none truncate">{userName}</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Super Admin</p>
            </div>
          )}
        </div>
        <button onClick={onLogout} className="w-full mt-2 flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all group relative">
          <LogOut size={18} />
          {!isCollapsed && <span className="text-xs font-black uppercase tracking-widest">Logout System</span>}
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;
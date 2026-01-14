import React, { useState, useRef } from "react";
import * as Icon from "lucide-react";

// --- ORIGINAL DATA ---
const ALL_TABS = ["Dashboard", "Finance", "Manpower", "Store", "Procurement", "Images", "Work Activity", "Confidential"];

const SECTIONS = [
  { id: "overview", label: "Profile Overview", icon: Icon.Eye },
  { id: "personal", label: "Edit Profile", icon: Icon.UserCircle, sub: "Personal Information" },
  { id: "reset", label: "Security", icon: Icon.ShieldCheck, sub: "Auth Settings" },
  { id: "add", label: "Add Member", icon: Icon.UserPlus, sub: "Team Invitation" },
  { id: "manage", label: "Team Directory", icon: Icon.Users, sub: "Manage Members", badge: "6" },
  { id: "add-project", label: "New Project", icon: Icon.Plus, sub: "Deployment" },
  { id: "manage-project", label: "Manage Projects", icon: Icon.Layout, sub: "Active Sites", badge: "3" },
];

const Profile = () => {
  const [activeSection, setActiveSection] = useState("personal"); // Defaulting to personal for your request
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const [projects, setProjects] = useState([
    { id: 1, name: "B-47 Tower", location: "Delhi", code: "B47", address: "Sector 62, Noida", tabs: ["Dashboard", "Finance", "Store"], status: "Active", progress: 85, teamSize: 12, budget: "₹45.2 Cr" },
    { id: 2, name: "Skyline Mall", location: "Noida", code: "SL-2024", address: "Sector 128, Noida", tabs: ["Dashboard", "Finance", "Manpower", "Store"], status: "Active", progress: 72, teamSize: 8, budget: "₹68.5 Cr" },
    { id: 3, name: "Tech Park", location: "Bangalore", code: "TP-2024", address: "Electronic City Phase 1", tabs: ["Dashboard", "Procurement", "Images"], status: "In Progress", progress: 45, teamSize: 6, budget: "₹32.8 Cr" }
  ]);

  return (
    <div className="min-h-screen bg-[#F9FBFF] font-sans antialiased text-slate-900">
      
      {/* --- CENTERED HORIZONTAL NAV BAR --- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
          <nav className="flex items-center gap-1 justify-center">
            {SECTIONS.map((s) => (
              <button 
                key={s.id} 
                onClick={() => { setActiveSection(s.id); setEditing(false); }} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all text-sm font-bold whitespace-nowrap ${
                  activeSection === s.id ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <s.icon size={18} />
                <span className="hidden lg:inline">{s.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{SECTIONS.find(s => s.id === activeSection)?.label}</h2>
          <p className="text-slate-500 font-medium mt-1">{SECTIONS.find(s => s.id === activeSection)?.sub}</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.05)] p-10">
          {activeSection === "overview" && <OverviewSection profilePic={profilePic} />}
          {activeSection === "personal" && <PersonalInfoSection editing={editing} setEditing={setEditing} profilePic={profilePic} setProfilePic={setProfilePic} />}
          {activeSection === "reset" && <SecuritySection />}
          {activeSection === "add" && <AddMemberSection />}
          {activeSection === "manage" && <UserDirectorySection />}
          {activeSection === "add-project" && <AddProjectSection onAdd={(p) => setProjects([...projects, {id: Date.now(), ...p}])} />}
          {activeSection === "manage-project" && <ManageProjectSection projects={projects} />}
        </div>
      </main>
    </div>
  );
};

// --- SUB COMPONENTS ---

const InputField = ({ label, icon: IconComp, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      {IconComp && <IconComp className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-all" size={18} />}
      <input {...props} className={`w-full ${IconComp ? 'pl-12' : 'pl-5'} pr-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-indigo-600 outline-none transition-all text-sm font-semibold text-slate-800 placeholder:text-slate-300`} />
    </div>
  </div>
);

const ViewField = ({ label, value, icon: IconComp }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
      <IconComp size={18} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-slate-700">{value}</p>
    </div>
  </div>
);

const OverviewSection = ({ profilePic }) => (
  <div className="animate-in fade-in slide-in-from-bottom-2">
    <div className="flex items-center gap-6 mb-10">
      <div className="h-24 w-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-xl overflow-hidden border-4 border-white">
        {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : "JG"}
      </div>
      <div>
        <h3 className="text-3xl font-black tracking-tight leading-none">Jitendar Goyal</h3>
        <p className="text-indigo-600 font-bold text-sm mt-2 flex items-center gap-2">
          <Icon.Briefcase size={14}/> Senior Lead Engineering • San Francisco, CA
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ViewField label="Full Name" value="Jitendar Goyal" icon={Icon.User} />
      <ViewField label="Email Address" value="jitendar@bootes.com" icon={Icon.Mail} />
      <ViewField label="Phone Number" value="+91 98765 43210" icon={Icon.Phone} />
      <ViewField label="Designation" value="Senior Lead Engineering" icon={Icon.Briefcase} />
      <ViewField label="Employee ID" value="BOOTES-2024-001" icon={Icon.Fingerprint} />
      <ViewField label="Work Location" value="San Francisco, CA" icon={Icon.MapPin} />
      {/* New Fields in Overview */}
      <ViewField label="Joining Date" value="15 Jan 2024" icon={Icon.Calendar} />
      <ViewField label="Reporting Manager" value="Amit Sharma" icon={Icon.UserCheck} />
      <ViewField label="DOB" value="12 May 1992" icon={Icon.Cake} />
    </div>   
  </div>
);

const PersonalInfoSection = ({ editing, setEditing, profilePic, setProfilePic }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (e) => {
    e.stopPropagation();
    if (window.confirm("Remove profile photo?")) {
      setProfilePic(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="h-24 w-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl overflow-hidden border-4 border-white">
              {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : "JG"}
            </div>
            
            {editing && (
              <div className="absolute inset-0 bg-black/60 rounded-3xl flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => fileInputRef.current.click()} className="text-white hover:text-indigo-300 transition-colors flex flex-col items-center">
                  <Icon.Camera size={18} />
                  <span className="text-[8px] font-black mt-1 uppercase">Update</span>
                </button>
                {profilePic && (
                  <button onClick={handleDeletePhoto} className="text-red-400 hover:text-red-500 transition-colors flex flex-col items-center border-t border-white/10 pt-2 w-12">
                    <Icon.Trash2 size={16} />
                    <span className="text-[8px] font-black mt-1 uppercase">Delete</span>
                  </button>
                )}
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
          <div>
            <h3 className="text-2xl font-black">Jitendar Goyal</h3>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Active Member</span>
          </div>
        </div>
        <button onClick={() => setEditing(!editing)} className={`px-8 py-3 rounded-xl font-black text-xs tracking-widest transition-all ${editing ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-indigo-600"}`}>
          {editing ? "SAVE CHANGES" : "EDIT PROFILE"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InputField label="Full Name" defaultValue="Jitendar Goyal" disabled={!editing} icon={Icon.User} />
        <InputField label="Email Address" defaultValue="jitendar@bootes.com" disabled={!editing} icon={Icon.Mail} />
        <InputField label="Phone Number" defaultValue="+91 98765 43210" disabled={!editing} icon={Icon.Phone} />
        <InputField label="Designation" defaultValue="Senior Lead Engineering" disabled icon={Icon.Briefcase} />
        <InputField label="Employee ID" defaultValue="BOOTES-2024-001" disabled icon={Icon.Fingerprint} />
        <InputField label="Location" defaultValue="San Francisco, CA" disabled={!editing} icon={Icon.MapPin} />
        
        {/* New Requested Fields */}
        <InputField label="Joining Date" type="date" defaultValue="2024-01-15" disabled={!editing} icon={Icon.Calendar} />
        <InputField label="Reporting Manager" defaultValue="Amit Sharma" disabled={!editing} icon={Icon.UserCheck} />
        <InputField label="DOB" type="date" defaultValue="1992-05-12" disabled={!editing} icon={Icon.Cake} />
      </div>
    </div>
  );
};

const UserDirectorySection = () => {
  const members = [
    { name: "Rohan Srivastava", email: "rohan.srivastava@bootes.in", role: "Admin", status: "Active", initials: "RS" },
    { name: "Kashif Mansoorie", email: "kashif.mansoories@bootes.com", role: "Site Manager", status: "Active", initials: "KM" },
    { name: "Harshit Jain", email: "harshit.jain@bootes.in", role: "Finance Head", status: "Active", initials: "HJ" },
  ];
  return (
    <div className="space-y-4">
      {members.map(m => (
        <div key={m.name} className="flex items-center p-5 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer group">
          <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black">{m.initials}</div>
          <div className="ml-5 flex-1">
            <h4 className="font-bold text-slate-800">{m.name}</h4>
            <p className="text-xs text-slate-400 font-medium">{m.email}</p>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.role}</span>
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ManageProjectSection = ({ projects }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {projects.map(p => (
      <div key={p.id} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group">
        <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6"><Icon.Building2 size={24}/></div>
        <h3 className="font-black text-lg tracking-tight">{p.name}</h3>
        <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">{p.code} • {p.location}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Progress</span>
            <span>{p.progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600" style={{ width: `${p.progress}%` }}></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const SecuritySection = () => (
  <div className="max-w-md mx-auto py-6 animate-in zoom-in-95">
    <div className="text-center mb-10">
      <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><Icon.Key size={30} /></div>
      <h3 className="text-xl font-black">Security Credentials</h3>
    </div>
    <div className="space-y-5">
      <InputField label="New Password" type="password" icon={Icon.Lock} placeholder="••••••••" />
      <InputField label="Confirm Password" type="password" icon={Icon.ShieldCheck} placeholder="••••••••" />
      <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs tracking-widest mt-4 hover:bg-indigo-600 transition-all shadow-xl">UPDATE PASSWORD</button>
    </div>
  </div>
);

const AddMemberSection = () => (
  <div className="space-y-8 animate-in fade-in">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InputField label="Member Name" placeholder="Ex: Rahul Sharma" icon={Icon.User} />
      <InputField label="Email ID" placeholder="rahul@bootes.com" icon={Icon.Mail} />
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">System Access Role</label>
        <select className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-indigo-600 outline-none transition-all">
          <option>Site Admin</option>
          <option>Standard User</option>
          <option>Super Administrator</option>
        </select>
      </div>
    </div>
    <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs tracking-widest shadow-lg shadow-indigo-100">SEND SYSTEM INVITE</button>
  </div>
);

const AddProjectSection = ({ onAdd }) => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InputField label="Project Name" icon={Icon.Building} />
      <InputField label="Project Code" icon={Icon.Hash} />
      <InputField label="Strategic Location" icon={Icon.MapPin} />
      <InputField label="Valuation" icon={Icon.Target} placeholder="₹ Cr" />
    </div>
    <div className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Module Permissions (Enable Tabs)</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ALL_TABS.map(tab => (
          <div key={tab} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-50 shadow-sm">
            <input type="checkbox" className="w-5 h-5 accent-indigo-600" />
            <span className="text-[12px] font-bold text-slate-700">{tab}</span>
          </div>
        ))}
      </div>
    </div>
    <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em]">INITIALIZE PROJECT SYSTEM</button>
  </div>
);

export default Profile;
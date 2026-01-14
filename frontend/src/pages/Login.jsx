import React, { useState } from 'react';
import { User, Lock, Globe, Linkedin } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@bootes.in" && password === "admin123") {
      onLogin('super_admin');
    } else {
      alert("Invalid ID or Password!");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f1f5f9] p-6 font-sans">
      {/* Balanced Container */}
      <div className="flex h-[580px] w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-gray-100">
        
        {/* Left Side: Solid Blue Section */}
        <div className="relative hidden w-[42%] flex-col items-center justify-center bg-[#111827] p-8 lg:flex">
          {/* Logo Container with BIG LOGO */}
          <div className="relative z-10 mb-8 flex h-56 w-56 items-center justify-center rounded-[3rem] bg-white shadow-xl overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Bootes Logo" 
              className="h-48 w-48 object-contain" 
            />
          </div>
          
          {/* Welcome Text */}
          <div className="relative z-10 text-center px-4">
            <h2 className="text-3xl font-black italic tracking-[0.2em] text-white uppercase leading-tight drop-shadow-lg">
              WELCOME TO <br /> BOOTES
            </h2>
            <div className="mt-4 h-1.5 w-24 bg-white/40 mx-auto rounded-full"></div>
          </div>

          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-white/5 -mr-12 -mt-12"></div>
        </div>

        {/* Right Side: Clean Login Form */}
        <div className="flex flex-1 flex-col justify-center bg-white px-12 md:px-16 lg:px-20">
          <div className="mb-8">
            <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">Login</h2>
            <div className="mt-4 h-2 w-10 rounded-full bg-[#1e40af]"></div>
          </div>

          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="ml-1 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 block text-left">Email Address</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1e40af] transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 py-4.5 pl-12 pr-4 text-sm font-bold text-slate-800 outline-none border-2 border-transparent focus:border-[#1e40af] focus:bg-white transition-all shadow-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 block text-left">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1e40af] transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 py-4.5 pl-12 pr-4 text-sm font-bold text-slate-800 outline-none border-2 border-transparent focus:border-[#1e40af] focus:bg-white transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pr-1">
              <button type="button" className="text-[11px] font-black uppercase tracking-widest text-[#1e40af] hover:underline transition-all">
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit"
              className="w-full rounded-2xl bg-[#1e40af] py-5 text-base font-black uppercase tracking-[0.25em] text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-800 active:scale-[0.98]"
            >
              Login Now
            </button>
          </form>

          {/* Corrected Social Icons */}
          <div className="mt-10 flex flex-col items-center gap-4 w-full">
             <div className="flex items-center justify-center gap-8 w-full">
                <a href="https://www.linkedin.com/company/bootes-impex-tech-ltd/" target="_blank" rel="noreferrer" 
                   className="p-3 rounded-full bg-blue-50 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all shadow-sm flex items-center justify-center">
                   <Linkedin size={24} />
                </a>
                <a href="https://bootes.in/" target="_blank" rel="noreferrer" 
                   className="p-3 rounded-full bg-slate-100 text-[#1e40af] hover:bg-[#1e40af] hover:text-white transition-all shadow-sm flex items-center justify-center">
                   <Globe size={24} />
                </a>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 text-center w-full">
               Official Portal
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white/70 backdrop-blur-md border-b border-neutral-200 flex items-center justify-between px-8 sticky top-0 z-10 transition-all shadow-sm">
      <div className="flex items-center gap-4 text-neutral-500 w-full max-w-md">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search companies, posts, or users..." 
            className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-100 border-none focus:ring-2 focus:ring-indigo-500/50 outline-none text-sm transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-all">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-indigo-100 cursor-pointer shadow-md">
          {/* User Avatar Placeholder */}
        </div>
      </div>
    </header>
  );
}

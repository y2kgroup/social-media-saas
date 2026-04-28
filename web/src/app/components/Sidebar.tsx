import Link from "next/link";
import { LayoutDashboard, Building2, Users, FileText, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  role?: "ADMIN" | "COMPANY_USER";
}

export default function Sidebar({ role = "ADMIN" }: SidebarProps) {
  const adminLinks = [
    { href: "/admin", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { href: "/admin/companies", icon: <Building2 size={20} />, label: "Companies" },
    { href: "/admin/users", icon: <Users size={20} />, label: "Users" },
    { href: "/admin/posts", icon: <FileText size={20} />, label: "All Posts" },
    { href: "/admin/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const companyLinks = [
    { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { href: "/dashboard/posts", icon: <FileText size={20} />, label: "My Posts" },
    { href: "/dashboard/promotions", icon: <Building2 size={20} />, label: "Promotions" },
    { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const links = role === "ADMIN" ? adminLinks : companyLinks;

  return (
    <aside className="w-64 h-screen bg-neutral-900 border-r border-neutral-800 flex flex-col fixed top-0 left-0 text-white transition-all duration-300">
      <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">
          S
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          SocialBot
        </h1>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all group font-medium"
          >
            <div className="group-hover:text-indigo-400 transition-colors">
              {link.icon}
            </div>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all font-medium">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

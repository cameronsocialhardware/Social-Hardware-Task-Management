"use client";

import { useSession } from "next-auth/react";
import { 
  Menu, 
  Bell
} from "lucide-react";

interface NavbarProps {
  setSidebarOpen: (v: boolean) => void;
}

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";
  
  const userInitials = session?.user?.name 
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)
    : session?.user?.email?.substring(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-40 h-20 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        
        <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{session?.user?.name || "User"}</p>
            <p className="text-xs text-gray-500 capitalize">{isAdmin ? "Administrator" : "Team Member"}</p>
          </div>
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-700 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 border border-white/10">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  );
}


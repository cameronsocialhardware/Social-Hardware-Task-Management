"use client";

import UserGuard from "@/components/auth/UserGuard";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";
import KanbanBoard from "@/components/ui/KanbanBoard";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

// Stat Card Component
const StatCard = ({ label, value, trend, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-orange-500/30 transition-colors group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-orange-500">
      <Icon size={64} />
    </div>
    <div className="relative z-10">
      <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-xs text-gray-500">from last month</span>
      </div>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <UserGuard>
      <div className="min-h-screen bg-[#050505] flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          isAdmin={isAdmin}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar setSidebarOpen={setIsSidebarOpen} />

          {/* Dashboard Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Dashboard
                      </h1>
                      <p className="text-gray-400 mt-1 text-sm sm:text-base">Here's what's happening with your projects today.</p>
                    </div>
                  </motion.div>

                  {/* Kanban Board */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <KanbanBoard 
                      isAdmin={isAdmin} 
                      currentUserId={(session?.user as any)?.id}
                    />
                  </motion.div>
            </div>
          </main>
        </div>
      </div>
    </UserGuard>
  );
}

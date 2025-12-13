"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050505] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center relative z-10"
      >
        <div className="mb-8 relative">
          <h1 className="text-6xl sm:text-9xl font-bold text-white/5 select-none transition-all duration-300">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 backdrop-blur-sm"
             >
                <FileQuestion size={40} className="sm:w-12 sm:h-12 text-orange-500 transition-all duration-300" />
             </motion.div>
          </div>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-8 text-sm sm:text-base">The page you are looking for doesn&apos;t exist or has been moved.</p>
        
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-700 text-white font-semibold rounded-xl hover:from-orange-500 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/20 text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}

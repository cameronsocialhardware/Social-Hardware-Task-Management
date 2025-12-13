"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050505] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center relative z-10"
      >
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <AlertCircle size={32} className="sm:w-10 sm:h-10 text-red-500 transition-all duration-300" />
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-gray-400 mb-8 text-sm sm:text-base">{error.message || "An unexpected error occurred."}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base"
          >
            Try again
          </button>
          <Link 
            href="/dashboard"
            className="px-6 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft size={18} />
            Go Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

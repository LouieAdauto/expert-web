"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, HelpCircle, Mail, MoreVertical } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full p-2 hover:bg-white/10 transition dark:hover:bg-gray-600 dark:bg-gray-600"
      >
        <MoreVertical size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-900 shadow-lg border dark:border-gray-700 p-2 z-50"
          >
            <Link href="/login" className="menu-item dark:text-gray-200">
              <User size={16} /> Login
            </Link>
            <Link href="/help" className="menu-item dark:text-gray-200">
              <HelpCircle size={16} /> Ayuda
            </Link>
            <Link href="/contact" className="menu-item dark:text-gray-200">
              <Mail size={16} /> Contacto
            </Link>

            <div className="flex items-center justify-between px-2 py-2 dark:text-gray-200">
              <span className="text-sm">Tema</span>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

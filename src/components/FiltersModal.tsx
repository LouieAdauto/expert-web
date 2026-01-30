"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Portal from "./Portal";

export function FiltersModal() {
  const [open, setOpen] = useState(false);

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer flex row items-center gap-2 ml-2  p-2 rounded-full p-1 hover:bg-white-gray-200 transition dark:hover:bg-gray-300 dark:bg-gray-600 bg-gray-500"
      >
        <p className="dark:text-gray-400 text-white text-xs">Filtros</p>
        <SlidersHorizontal className="center text-white dark:text-gray-400"  size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <Portal>
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg relative shadow-xl"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 opacity-70 hover:opacity-100 dark:text-gray-500"
                >
                  <X />
                </button>

                <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">
                  Filtros
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Aquí van tus filtros ✨
                </p>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}

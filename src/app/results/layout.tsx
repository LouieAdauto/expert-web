"use client";

import React from "react";
import Link from "next/link";
import { FiltersModal } from "@/components/FiltersModal";
import { UserMenu } from "@/components/UserMenu";
import styles from "./styles.module.css";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-gray-50 to-orange-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header
        className="
          sticky top-0 z-50
          border-b
          bg-white/90 dark:bg-gray-950/90
          backdrop-blur
          border-gray-200 dark:border-white/10
        "
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center gap-2">
          {/* LEFT – Logo */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center font-bold"
            >
              <span className={`${styles.appName} block sm:hidden text-md leading-none`}>expert</span>

              {/* Desktop */}
              <span
                className={`${styles.appName} hidden sm:block text-2xl`}
              >
                expert
              </span>
            </Link>
          </div>

          {/* CENTER – Search */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-xl flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar expertos..."
                className="
                  w-full rounded-full
                  bg-gray-200 dark:bg-gray-800
                  text-gray-900 dark:text-white
                  px-4 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-500
                "
              />
              <FiltersModal />
            </div>
          </div>

          {/* RIGHT – User */}
          <div className="flex items-center justify-end shrink-0">
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-gray-500 flex flex-wrap gap-4 justify-center">
          <span>© {new Date().getFullYear()} Expert</span>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}

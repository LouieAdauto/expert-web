"use client";

import React from "react";
import Link from "next/link";
import styles from './styles.module.css'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-gray-50 to-orange-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-orange-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
          {/* Logo */}
          <Link href="/" className={styles.appName}>
            expert
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Buscar expertos, skills, posiciones..."
              className="w-full rounded-full bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
            />
          </div>
          <div></div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-xs text-gray-500 flex flex-wrap gap-4 justify-center">
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

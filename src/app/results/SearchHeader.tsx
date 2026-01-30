"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import styles from "./styles.module.css";

export default function SearchHeader() {
  const params = useSearchParams();
  const initialQuery = params.get("query") ?? "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("query", searchTerm);
    }
    router.push(`/results?${params.toString()}`, { scroll: false });
  };

  return (
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
        {/* Logo */}
        <Link href="/" className="font-bold">
          <span className={`${styles.appName} block sm:hidden text-md`}>
            expert
          </span>
          <span className={`${styles.appName} hidden sm:block text-2xl`}>
            expert
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xl flex items-center gap-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Buscar expertos..."
              className="w-full rounded-full bg-gray-200 dark:bg-gray-800 px-4 py-2 text-sm
              focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-600 rounded-full p-2 hover:bg-gray-500 transition"
            >
              <Search size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* User */}
        <UserMenu />
      </div>
    </header>
  );
}

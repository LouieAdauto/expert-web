"use client"
import React from 'react';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import Toolbar from '@/components/Toolbar';

export default function App() {
  const router = useRouter()
  const handleSearch = (query: string) => {
    router.push(`/results?query=${encodeURIComponent(query)}`);
    console.log('Searching fer:', query);
    // Add your search logic here
  };

  return <div>
      <Toolbar />
      <Logo
        fontSize={50} />
      <SearchBar
        onSearch={handleSearch}
      />
  </div>
}
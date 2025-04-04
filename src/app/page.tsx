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
    console.log('Searching for:', query);
    // Add your search logic here
  };

  return <div>
    <Toolbar></Toolbar>
    <Logo fontSize={50}></Logo>
    <SearchBar 
      onSearch={handleSearch}
    />
  </div>
}
'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiArrowRight } from 'react-icons/fi';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 20px;
  color: #999;
  font-size: 18px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 50px;
  border: none;
  border-radius: 25px;
  background-color: #f5f5f5;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-color: #e8e8e8;
  }

  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: #333;
    background: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search...", 
  onSearch 
}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchIcon />
        <SearchInput
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
        />
        <SearchButton onClick={handleSearch}>
          <FiArrowRight size={20} />
        </SearchButton>
      </SearchWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
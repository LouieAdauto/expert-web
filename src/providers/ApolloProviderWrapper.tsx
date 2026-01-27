"use client"
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apollo-client';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ApolloProviderWrapper: React.FC<Props> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;
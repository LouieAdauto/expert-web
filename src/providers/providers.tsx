"use client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import apolloClient from "./apollo-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      themes={["light", "dark"]}
    >
      <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
    </ThemeProvider>
  );
}

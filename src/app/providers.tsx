'use client'

import { ChakraTheme } from '@/styles/theme';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleAdSense } from 'nextjs-google-adsense';
import { Analytics } from '@vercel/analytics/react';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAdSense publisherId="pub-9513215669385884" />
      <Analytics />
      <CacheProvider>
        <ChakraProvider resetCSS theme={ChakraTheme}>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}
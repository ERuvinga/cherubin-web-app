'use client';

import { QueryClientProvider, QueryClient } from 'react-query';

//Provider Wrapper for React Querry
const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

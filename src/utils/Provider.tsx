"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import Toast from "@/components/toast/Toast";

export const queryCLient = new QueryClient();
const Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryCLient}>
      <SessionProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
      <Toast />
    </QueryClientProvider>
  );
};

export default Provider;

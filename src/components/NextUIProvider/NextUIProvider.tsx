"use client";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function NextUI({ children }: { children: React.ReactNode }) {
    // 2. Wrap NextUIProvider at the root of your app
    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </NextUIProvider>
    );
}

export default NextUI;

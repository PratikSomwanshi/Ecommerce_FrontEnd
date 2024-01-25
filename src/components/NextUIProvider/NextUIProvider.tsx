"use client";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { CookiesProvider } from "react-cookie";

function NextUI({ children }: { children: React.ReactNode }) {
    // 2. Wrap NextUIProvider at the root of your app
    return (
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <NextUIProvider>{children}</NextUIProvider>
        </CookiesProvider>
    );
}

export default NextUI;

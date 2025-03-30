"use client";

import React from "react";
import { ThemeProvider } from "./theme-context";

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>
}
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Themes } from "@/components/themes";

type Theme = keyof typeof Themes; // 'light' | 'dark'
type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeWrapper({
    children,
    themes, // Passed from server component
}: {
    children: React.ReactNode;
    themes: typeof Themes;
}) {
    const [theme, setTheme] = useState<Theme>("light");
    
    // Apply theme changes to CSS variables
    useEffect(() => {
        const currentTheme = themes[theme];
        document.documentElement.style.setProperty("--background", currentTheme.background);
        document.documentElement.style.setProperty("--text", currentTheme.text);
        document.documentElement.style.setProperty("--primary", currentTheme.primary);
        document.documentElement.style.setProperty("--secondary", currentTheme.secondary);
    }, [theme, themes]);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeWrapper");
    }
    return context;
};
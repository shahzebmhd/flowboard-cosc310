"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import './globals.css';

type Theme = 'light' | 'dark';
type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeWrapper({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeWrapper');
    }
    return context;
};
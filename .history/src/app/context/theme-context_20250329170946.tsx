"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Theme = 'light' | 'dark' | 'custom';
type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    customColors:{
        background: string,
        text: string,
    };
    updateCustomColors: ( colors: { background: string; text: string }) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children : ReactNode }) => {
    const [ theme, setTheme ] = useState<Theme>('light');
    const [ customColors, setCustomColors ] = useState ({
        background: '#FFFFFF',
        text: '#000000',
    });

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const savedColors = localStorage.getItm('customColors');

        if ( savedTheme ) setTheme(savedTheme);
        if ( savedColors ) setCustomColors(savedColors);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        localStorage.setItem('customColors', JSON.stringify(customColors));
    }, [ theme, customColors ]);

    const updateCustomColors = ( colors: { background: string; text: string }) => {
        setCustomColors(colors);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, customColors, updateCustomColors}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if ( !context ) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    
    return context;
}
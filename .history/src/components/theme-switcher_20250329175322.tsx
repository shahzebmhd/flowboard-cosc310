"use client";

import { useTheme } from "../features/settings/components/theme-wrapper";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"; // Or any other icons
import { motion } from "framer-motion";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    
    return (
        <button
            onClick={toggleTheme}
            aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
            className={`relative flex items-center justify-between w-16 h-8 rounded-full p-1 bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300 ease-in-out`}
        >
            <motion.div
                className={`absolute top-1 bottom-1 ${theme === "light" ? "left-1" : "right-1"} w-6 h-6 rounded-full bg-white shadow-md`}
                layout
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            />
            <div className="flex items-center justify-center w-6 h-6">
                <SunIcon className={`w-4 h-4 ${theme === "light" ? "text-yellow-500" : "text-gray-400"}`} />
            </div>
            
            <div className="flex items-center justify-center w-6 h-6">
                <MoonIcon className={`w-4 h-4 ${theme === "dark" ? "text-blue-400" : "text-gray-400"}`} />
            </div>
        </button>
    );
}
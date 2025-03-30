// components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "../features/settings/components/theme-wrapper";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    
    return (
        <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            className="p-2 rounded border"
        >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    );
}
import React, { createContext, useContext, useState, useEffect } from "react";

// Type Definitions
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme,
    toggleTheme: () => void
}

// Creat initial context
const ThemeContext = createContext< ThemeContextType | undefined >(undefined);

// Media query to check system preference
const getInitialTheme = (): Theme => {
    const isDark = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return isDark ? 'dark' : 'light'
}

// Provider function
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [ theme, setTheme ] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }, [theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    })

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context;
}
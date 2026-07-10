import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'amber', color: '#f59e0b', name: 'Amber', gradient: ['#fde68a', '#f59e0b', '#ea580c'] },
  { id: 'emerald', color: '#10b981', name: 'Emerald', gradient: ['#a7f3d0', '#10b981', '#047857'] },
  { id: 'rose', color: '#f43f5e', name: 'Rose', gradient: ['#fecdd3', '#f43f5e', '#be123c'] },
  { id: 'cyan', color: '#06b6d4', name: 'Cyan', gradient: ['#cffafe', '#06b6d4', '#0369a1'] },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('amber');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'amber';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const getThemeColor = () => themes.find(t => t.id === theme)?.color || '#f59e0b';

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themes, getThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

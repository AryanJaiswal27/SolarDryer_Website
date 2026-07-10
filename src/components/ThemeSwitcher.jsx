import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme } from './ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const { theme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-switcher-wrapper">
      <button 
        className={`theme-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme picker"
      >
        {isOpen ? <X size={20} /> : <Palette size={20} />}
      </button>
      
      <div className={`theme-panel glass-panel ${isOpen ? 'open' : ''}`}>
        <h4>Select Theme</h4>
        <div className="theme-options">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-option ${theme === t.id ? 'active' : ''}`}
              onClick={() => changeTheme(t.id)}
              title={t.name}
            >
              <span className="color-circle" style={{ backgroundColor: t.color }}></span>
              <span className="theme-name">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;

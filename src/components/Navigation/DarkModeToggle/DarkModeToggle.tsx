import React from 'react';

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="dark-mode-toggle">
      <span>Dark Mode</span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={toggleDarkMode} 
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
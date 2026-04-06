import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext({
  isDark: true,
  glowLevel: 50, // 0 to 100
  toggleTheme: () => {},
  setGlow: (val: number) => {}
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const [glowLevel, setGlowLevel] = useState(70);

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      glowLevel, 
      toggleTheme: () => setIsDark(!isDark),
      setGlow: (val) => setGlowLevel(val)
    }}>
      <div style={{ 
        '--neon-glow': isDark ? `${glowLevel / 10}px` : '0px',
        '--accent-color': isDark ? '#00f2ff' : '#007bff'
      } as any}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

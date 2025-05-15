import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  accent: {
    primary: string;
    secondary: string;
    hover: string;
    red: string;
  };
  border: string;
  gradient: {
    start: string;
    end: string;
  };
}

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: { dark: Theme; light: Theme } = {
  dark: {
    primary: '#1a1a1a',
    secondary: '#2e2e2e',
    tertiary: '#6b6b6b',
    text: {
      primary: '#F0F0F0',
      secondary: '#A6A6A6',
      muted: '#808080'
    },
    accent: {
      primary: '#96c93d',
      secondary: '#96c93d',
      hover: '#7DAB33',
      red: '#ff6347'
    },
    border: '#6b6b6b',
    gradient: {
      start: '#2e2e2e',
      end: '#1a1a1a'
    }
  },
  light: {
    primary: '#FFFFFF',
    secondary: '#f0f0f0',
    tertiary: '#808080',
    text: {
      primary: '#333333',
      secondary: '#4d4d4d',
      muted: '#b0b0b0'
    },
    accent: {
      primary: '#96c93d',
      secondary: '#96c93d',
      hover: '#7DAB33',
      red: '#ff6347'
    },
    border: '#808080',
    gradient: {
      start: '#f0f0f0',
      end: '#FFFFFF'
    }
  }
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // Default to dark theme
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update CSS variables
    const theme = isDark ? themes.dark : themes.light;
    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          document.documentElement.style.setProperty(
            `--${key}-${subKey}`,
            subValue as string // Cast to string as CSS variables are strings
          );
        });
      } else {
        document.documentElement.style.setProperty(`--${key}`, value as string); // Cast to string
      }
    });
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

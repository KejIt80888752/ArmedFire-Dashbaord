import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty("--bg", "#0f172a");
      root.style.setProperty("--card", "#1e293b");
      root.style.setProperty("--border", "#334155");
      root.style.setProperty("--text", "#f1f5f9");
      root.style.setProperty("--muted", "#94a3b8");
      root.style.setProperty("--input-bg", "#0f172a");
    } else {
      root.style.setProperty("--bg", "#f1f5f9");
      root.style.setProperty("--card", "#ffffff");
      root.style.setProperty("--border", "#e2e8f0");
      root.style.setProperty("--text", "#0f172a");
      root.style.setProperty("--muted", "#64748b");
      root.style.setProperty("--input-bg", "#f8fafc");
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(p => !p) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};

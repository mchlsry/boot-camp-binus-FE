import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('app_theme', 'light'); // 'light' atau 'dark'
  const [language, setLanguage] = useLocalStorage('app_language', 'en'); // 'en' atau 'id'
  const [sortOrder, setSortOrder] = useLocalStorage('tasks_sort', 'created_desc'); // example

  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    sortOrder,
    setSortOrder
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

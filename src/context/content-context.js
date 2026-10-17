import { createContext, useContext } from 'react';

export const ContentContext = createContext(null);

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};

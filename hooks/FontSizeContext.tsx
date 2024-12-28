import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FontSizeContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSizeState] = useState<number>(2); // Default: Medium

  useEffect(() => {
    const loadFontSize = async () => {
      const storedFontSize = await AsyncStorage.getItem('fontSize');
      if (storedFontSize) {
        setFontSizeState(parseInt(storedFontSize, 10));
      }
    };
    loadFontSize();
  }, []);

  const setFontSize = async (size: number) => {
    setFontSizeState(size);
    await AsyncStorage.setItem('fontSize', size.toString());
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

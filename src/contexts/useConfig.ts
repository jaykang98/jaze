import { useCallback, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/utils/useLocalStorage";

export const useConfig = () => {
  const { getItem, setItem } = useLocalStorage();
  const [isDecrypted, setIsDecrypted] = useState(() =>
    JSON.parse(getItem("isDecrypted") || "false"),
  );
  const [isDarkMode, setIsDarkMode] = useState(() =>
    JSON.parse(getItem("isDarkMode") || "false"),
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDecryptionMode = useCallback(() => {
    setIsDecrypted((prev) => {
      const newValue = !prev;
      setItem("isDecrypted", String(newValue));
      return newValue;
    });
  }, [setItem]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      setItem("isDarkMode", String(newValue));
      return newValue;
    });
  }, [setItem]);

  return {
    isDarkMode,
    toggleDarkMode,
    isDecrypted,
    toggleDecryptionMode,
  };
};

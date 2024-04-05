import { encryptData, decryptData } from "../security/encryptionProtocol";

interface UseLocalStorageReturn {
  setItem: (value: string) => void;
  getItem: () => string | null;
  removeItem: () => void;
}

export const useLocalStorage = (key: string): UseLocalStorageReturn => {
  const setItem = (value: string) => { 
      localStorage.setItem(key, encryptData(value)); };

  const getItem = (): string | null => {
    const item = localStorage.getItem(key);
    return item ? decryptData(item) : null;
  };

  const removeItem = () => {
    localStorage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
};

import { encryptData, decryptData } from "../security/encryptionProtocol";

interface UseLocalStorageReturn {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  getAllItems: () => { [key: string]: string };
  setAllItems: (items: { [key: string]: string }) => void;
}

export const useLocalStorage = (): UseLocalStorageReturn => {
  const setItem = (key: string, value: string) => {
    const shouldEncrypt = localStorage.getItem("isDecrypted") === null;
    const processedValue = shouldEncrypt ? encryptData(value) : value;
    localStorage.setItem(key, processedValue);
  };

  const getItem = (key: string): string | null => {
    const item = localStorage.getItem(key);
    const shouldDecrypt = localStorage.getItem("isDecrypted") !== null;
    return shouldDecrypt && item ? decryptData(item) : item;
  };

  const getAllItems = (): { [key: string]: string } => {
    const items: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const item = getItem(key);
        if (item !== null) {
          items[key] = item;
        }
      }
    }
    return items;
  };
  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const setAllItems = (items: { [key: string]: string }) => {
    Object.entries(items).forEach(([key, value]) => {
      setItem(key, value);
    });
  };

  return { setItem, getItem, getAllItems, setAllItems, removeItem };
};

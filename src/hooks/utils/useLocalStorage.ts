import { encryptData, decryptData } from "../security/encryptionProtocol";

interface UseLocalStorageReturn {
    setItem: (key: string, value: string) => void;
    getItem: (key: string) => string | null;
    removeItem: (key: string) => void;
}

export const useLocalStorage = (): UseLocalStorageReturn => {
    const setItem = (key: string, value: string) => {
        localStorage.setItem(key, encryptData(value));
    };

    const getItem = (key: string): string | null => {
        const item = localStorage.getItem(key);
        return item ? decryptData(item) : null;
    };

    const removeItem = (key: string) => {
        localStorage.removeItem(key);
    };

    return { setItem, getItem, removeItem };
};

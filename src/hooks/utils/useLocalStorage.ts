import { useState } from "react";
import { encryptData, decryptData } from "../security/utils"; 

interface UseLocalStorageReturn {
    setItem: (value: string) => void;
    getItem: () => string | null;
    removeItem: () => void;
}

export const useLocalStorage = (key: string): UseLocalStorageReturn => {
    const setItem = (value: string) => {
        const encryptedValue = encryptData(value);
        localStorage.setItem(key, encryptedValue);
    };

    const getItem = (): string | null => {
        const item = localStorage.getItem(key);
        return item ? decryptData(item) : null;
    };

    const removeItem = () => {
        localStorage.removeItem(key);
    };

    return { setItem, getItem, removeItem };
};

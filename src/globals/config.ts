import { useCallback, useState } from "react";
import { useLocalStorage } from "../hooks/utils/useLocalStorage";

export const config = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const { getItem, setItem } = useLocalStorage("isDecrypted");
    const isDecrypted = getItem() === "true";

    const toggleDecryptionMode = useCallback(() => {
        setItem(String(!isDecrypted));
    }, [isDecrypted, setItem]);

    const toggleDarkMode = useCallback(() => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        document.body.classList.toggle("dark-mode");
        return newIsDarkMode;
    }, [isDarkMode]);


    return {
        isDarkMode,
        toggleDarkMode,
        isDecrypted,
        toggleDecryptionMode,
    };
};
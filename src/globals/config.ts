import { useCallback, useState } from "react";
import { useLocalStorage } from "../hooks/utils/useLocalStorage";

export const config = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isDecrypted, setDecryptionMode] = useState<boolean>(true);
    const { setItem } = useLocalStorage();

    const toggleDecryptionMode = useCallback(() => {
        setItem("isDecrypted", String(!isDecrypted));
        setDecryptionMode(isDecrypted);
    }, [setItem]);


    const toggleDarkMode = useCallback(() => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode");
    }, [isDarkMode]);


    return {
        isDarkMode,
        toggleDarkMode,
        isDecrypted,
        toggleDecryptionMode,
    };
};
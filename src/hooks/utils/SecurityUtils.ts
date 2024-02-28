// src/hooks/utils/SecurityUtils.ts
import CryptoJS from "crypto-js";

export const encryptData = (data: string): string => {
    // Check if DEBUG mode is enabled and return data as-is if true
    if (process.env.REACT_APP_IS_DEBUG === 'TRUE') {
        console.log('DEBUG mode is enabled. Skipping encryption.');
        return data;
    }
    return CryptoJS.AES.encrypt(data, process.env.REACT_APP_SECRETKEY).toString();
};

export const decryptData = (ciphertext: string): string | null => {
    // Check if DEBUG mode is enabled and return data as-is if true
    if (process.env.REACT_APP_IS_DEBUG === 'TRUE') {
        console.log('DEBUG mode is enabled. Skipping decryption.');
        return ciphertext;
    }
    try {
        const bytes = CryptoJS.AES.decrypt(
            ciphertext,
            process.env.REACT_APP_SECRETKEY,
        );
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText !== "" ? originalText : null;
    } catch (error) {
        console.error("Error during decryption:", error);
        return null;
    }
};

export const generateMD5 = (data: string): string => {
    return CryptoJS.MD5(data).toString();
};

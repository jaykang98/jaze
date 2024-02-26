// src/hooks/utils/SecurityUtils.ts
import CryptoJS from "crypto-js";

export const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, process.env.REACT_APP_SECRETKEY).toString();
};

export const decryptData = (ciphertext: string): string | null => {
  try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SECRETKEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText !== "" ? originalText : null;
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

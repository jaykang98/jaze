// src/utils/SecurityUtils.ts
import CryptoJS from "crypto-js";

const secretKey = "a0c2b1ab664e5ea5ca735d57f4cdaaf8"; // Replace with your actual secret key

/**
 * Encrypts the provided data using AES encryption.
 * @param data The data to encrypt.
 * @returns The encrypted data as a string.
 */
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

/**
 * Decrypts the provided ciphertext using AES.
 * @param ciphertext The encrypted data.
 * @returns The decrypted data as a string, or null if decryption fails.
 */
export const decryptData = (ciphertext: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText !== "" ? originalText : null;
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

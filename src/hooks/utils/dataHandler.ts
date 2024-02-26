// src/utils/DataHandler.tsx
import CryptoJS from "crypto-js";
import { fetchData } from "../api/API";

const secretKey = "a0c2b1ab664e5ea5ca735d57f4cdaaf8";
/**
 * Encrypts the provided data using AES encryption.
 * @param data The data to encrypt.
 * @returns The encrypted data as a string.
 */
export const encryptData = (data: string) =>
  CryptoJS.AES.encrypt(data, secretKey).toString();

/**
 * Decrypts the provided ciphertext using AES.
 * @param ciphertext The encrypted data.
 * @returns The decrypted data as a string.
 */
export const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * A utility function to fetch and process data from an API.
 * This function is a wrapper around the fetchData function from API.ts, providing additional error handling or data transformation if necessary.
 * @param method The API method to be called.
 * @param params The parameters for the API request.
 * @returns A promise that resolves with the fetched and processed data.
 */
export const fetchAndProcessData = async (
  method: string,
  params: Record<string, any>,
) => {
  try {
    const response = await fetchData(method, params);
    // Process the response if needed
    return response;
  } catch (error) {
    console.error("Error fetching and processing data:", error);
    throw error;
  }
};

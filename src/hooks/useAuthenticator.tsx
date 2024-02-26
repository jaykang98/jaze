import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const secretKey = "a0c2b1ab664e5ea5ca735d57f4cdaaf8";
const apiKey = "053905e1fc8b0de378dc341a24ec68c7";
const baseUrl = "http://www.last.fm/api/auth/";

/**
 * Encrypts the provided data using AES encryption.
 * @param data The data to encrypt.
 * @returns The encrypted data as a string.
 */
const encryptData = (data: string) =>
  CryptoJS.AES.encrypt(data, secretKey).toString();

/**
 * Decrypts the provided ciphertext using AES.
 * @param ciphertext The encrypted data.
 * @returns The decrypted data as a string.
 */
const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const useAuthenticator = () => {
  const [userID, setUserIDState] = useState<string | null>(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      const decryptedUserID = decryptData(storedUserID);
      setUserIDState(decryptedUserID);
    }
  }, []);

  const startAuth = () => {
    const callbackUrl = encodeURIComponent(window.location.href);
    const authUrl = `${baseUrl}?api_key=${apiKey}&cb=${callbackUrl}`;
    window.location.href = authUrl;
  };

  const fetchSession = async (token: string) => {
    const apiSigString = `api_key${apiKey}methodauth.getSessiontoken${token}${secretKey}`;
    const apiSig = CryptoJS.MD5(apiSigString).toString();
    const sessionUrl = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token}&api_key=${apiKey}&api_sig=${apiSig}&format=json`;

    try {
      const response = await fetch(sessionUrl);
      if (!response.ok)
        throw new Error(`Network response was not ok: ${response.statusText}`);
      const data = await response.json();
      if (data.session) {
        console.log("Session fetched successfully:", data.session);
        setUserID(data.session.name);
      }
    } catch (error) {
      console.error("Fetching session failed:", error);
    }
  };

  const setUserID = (userID: string) => {
    const encryptedUserID = encryptData(userID);
    localStorage.setItem("userID", encryptedUserID);
    setUserIDState(userID);
  };

  const getUserID = () => userID;

  return { startAuth, fetchSession, setUserID, getUserID };
};

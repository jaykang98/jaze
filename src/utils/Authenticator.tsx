// Authenticator.tsx
import CryptoJS from "crypto-js";
import { useEffect } from "react";

const secretKey = "a0c2b1ab664e5ea5ca735d57f4cdaaf8";
const apiKey = "053905e1fc8b0de378dc341a24ec68c7";

const encryptData = (data: string) =>
  CryptoJS.AES.encrypt(data, secretKey).toString();
const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const startAuth = () => {
  const callbackUrl = encodeURIComponent(window.location.href);
  const authUrl = `http://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackUrl}`;

  window.location.href = authUrl;
};

export const fetchSession = async (token: string) => {
  const apiSigString = `api_key${apiKey}methodauth.getSessiontoken${token}${secretKey}`;
  const apiSig = CryptoJS.MD5(apiSigString).toString();

  const sessionUrl = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token}&api_key=${apiKey}&api_sig=${apiSig}&format=json`;

  try {
    const response = await fetch(sessionUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.session) {
      console.log("Session fetched successfully:", data.session);
      setUserID(data.session.name);
    }
  } catch (error) {
    console.error("Fetching session failed:", error);
  }
};

export const setUserID = (userID: string) => {
  localStorage.setItem("userID", encryptData(userID));
};

export const getUserID = () => {
  const encryptedUserID = localStorage.getItem("userID");
  return encryptedUserID ? decryptData(encryptedUserID) : null;
};

export const Authenticator: React.FC = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      fetchSession(token);
    }
  }, []);

  return null;
};

// src/hooks/security/utils.ts
import CryptoJS from "crypto-js";

export const encryptData = (data: string): string => {
  if (process.env.REACT_APP_IS_DEBUG) {
    console.log("DEBUG mode is enabled. Skipping encryption.");
    return data;
  }
  return CryptoJS.AES.encrypt(
    data,
      process.env.REACT_APP_LASTFM_SECRETKEY,
  ).toString();
};

export const decryptData = (ciphertext: string): string | null => {
  if (process.env.REACT_APP_IS_DEBUG === "TRUE") {
    console.log("DEBUG mode enabled. Skipping decryption.");
    return ciphertext;
  }
  try {
    const bytes = CryptoJS.AES.decrypt(
      ciphertext,
        process.env.REACT_APP_LASTFM_SECRETKEY,
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

export const generateRandomString = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const generateApiSignature = (
  params: { [key: string]: string },
  secret: string,
) => {
  const orderedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("");
  return generateMD5(`${orderedParams}${secret}`);
};

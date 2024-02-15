import { useState, useEffect } from 'react';
import { decrypt } from './Encryption'; // Ensure this path is correct
import CryptoJS from 'crypto-js';

// Custom hook for handling authentication
const HandleAuth = () => {
    const [userID, setUserID] = useState(localStorage.getItem('userID') || null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            if (userID) return;

            const encryptedToken = sessionStorage.getItem('authToken');
            const token = encryptedToken ? decrypt(encryptedToken) : null;
            const apiKey = '053905e1fc8b0de378dc341a24ec68c7';
            const secret = 'a0c2b1ab664e5ea5ca735d57f4cdaaf8';

            const paramsString = `api_key${apiKey}methodauth.getSessiontoken${token}${secret}`;
            const apiSig = CryptoJS.MD5(paramsString).toString();

            if (token) {
                const url = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token}&api_key=${apiKey}&api_sig=${apiSig}&format=json`;

                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();

                    if (data.session && data.session.name) {
                        setUserID(data.session.name);
                        localStorage.set(userID, data.session.name);
                    }
                } catch (error) {
                    console.error("Failed to fetch session:", error);
                    setError(error);
                }
            }
        };

        fetchUserName();
    }, [userID]); // Dependency array to prevent re-fetching if userID is already set

    return { userID, error };
};

export default HandleAuth;

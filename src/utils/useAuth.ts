import { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming AuthState is something like this:
// interface AuthState {
//   userID: string | null;
//   error: string | null;
//   isLoading: boolean;
// }

export const useAuth = () => {
    const [authState, setAuthState] = useState({ userID: null, error: null, isLoading: true });

    useEffect(() => {
        const validateSession = async () => {
            try {
                const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No token found');
                }

                // Replace 'YOUR_API_ENDPOINT' with your actual endpoint to validate the session token
                const response = await axios.get('YOUR_API_ENDPOINT', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Assuming the response contains a userID field on successful authentication
                if (response.data && response.data.userID) {
                    const { userID } = response.data;
                    setAuthState({ userID, error: null, isLoading: false });
                    localStorage.setItem('userID', userID); // Optional: Save userID to local storage if needed
                } else {
                    throw new Error('Session validation failed');
                }
            } catch (error) {
                console.error(error);
                setAuthState({ userID: null, error: 'Authentication failed', isLoading: false });
            }
        };

        validateSession();
    }, []);

    return authState;
};

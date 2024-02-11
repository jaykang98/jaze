// AuthCallbackHandler.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthCallbackHandler = () => {
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        if (token) {
            console.log('Received authentication token:', token);
            // Dispatch this token to your state management system
            // or make a follow-up request to exchange the token for a session.
        }
    }, [location]);

    return 'Authentication in progress...';
};

export default AuthCallbackHandler;

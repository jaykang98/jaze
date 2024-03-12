// src/contexts/ViewTitleContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ViewTitleContextType {
    title: string;
    setTitle: (title: string) => void;
}
interface ViewTitleProviderProps {
    children: ReactNode; 
}
const ViewTitleContext = createContext<ViewTitleContextType | undefined>(undefined);

export const ViewTitleProvider: React.FC<ViewTitleProviderProps> = ({ children }) => {
    const [title, setTitle] = useState('');

    return (
        <ViewTitleContext.Provider value={{ title, setTitle }}>
            {children}
        </ViewTitleContext.Provider>
    );
};

export const useViewTitle = () => {
    const context = useContext(ViewTitleContext);
    if (context === undefined) {
        throw new Error('useViewTitle must be used within a ViewTitleProvider');
    }
    return context;
};

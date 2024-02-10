// Button.tsx
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Expect an event argument
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
};

export default Button;

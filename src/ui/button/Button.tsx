// Button.tsx
import React from 'react';
import styles from './Button.module.css'; // Import the CSS module

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset"; // Optional type prop
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = "button" }) => {
    return <button type={type} className={styles.button} onClick={onClick}>{children}</button>;
};

export default Button;

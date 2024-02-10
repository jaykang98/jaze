// Import React and CSS module
import React from 'react';
import styles from './Input.module.css';

// Updated interface to include the 'label' prop
interface InputProps {
    label: string; // Add this line to include 'label' in the interface
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Input component definition
const Input: React.FC<InputProps> = ({ label, type, name, value, onChange }) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={styles.inputField}
            />
        </div>
    );
};

export default Input;

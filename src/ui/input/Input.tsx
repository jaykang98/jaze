import React from 'react';
import styles from './Input.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'; // Assuming you're using FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface InputProps {
    id: string;
    label?: string; // This is already in your interface, shown here for context
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon?: IconDefinition; // Optional prop for an icon
}

const Input: React.FC<InputProps> = ({ id, label, type, name, value, onChange, placeholder, icon }) => {
    return (
        <div className={styles.inputContainer}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {icon && <FontAwesomeIcon icon={icon} />}
                    {label}
                </label>
            )}
            <div className={styles.inputGroup}>
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={styles.inputField}
                />
            </div>
        </div>
    );
};


export default Input;

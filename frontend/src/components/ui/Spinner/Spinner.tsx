import React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
    size = 'medium',
    color = '#667eea'
}) => {
    return (
        <div className={styles.spinnerContainer}>
            <div
                className={`${styles.spinner} ${styles[size]}`}
                style={{ borderTopColor: color }}
            />
        </div>
    );
};

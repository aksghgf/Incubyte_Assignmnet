import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hoverable = false,
}) => {
    const classes = [
        styles.card,
        hoverable ? styles.hoverable : '',
        className,
    ].filter(Boolean).join(' ');

    return <div className={classes}>{children}</div>;
};

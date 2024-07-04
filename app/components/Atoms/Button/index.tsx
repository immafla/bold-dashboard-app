'use client'
import styles from './button.module.css'

interface Props {
    label: string;
    click: () => void;
    aditionalStyles?: any;
}

export function Button({ label, click, aditionalStyles }: Readonly<Props>) {
    return (
        <button onClick={() => click} className={`${styles.button} ${aditionalStyles}`}>{label}</button>
    );
}
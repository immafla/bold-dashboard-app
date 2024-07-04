import { ReactNode } from 'react';
import styles from './card.module.css'

interface Props {
    children: ReactNode
    title: string;
    helpText: string;
}

export function Card({children, title, helpText}: Readonly<Props>) {
    return (
        <div className={styles.cardContainer}>
            <header className={styles.cardHeader}>
                <div>
                    {title}
                </div>
                <div>
                    {helpText}
                </div>
            </header>
            <section className={styles.bodySection}>
                {children}
            </section>
        </div>
    );
}
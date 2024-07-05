"use client";
import styles from "./button.module.css";

interface Props {
	label: string;
	click: () => void;
	aditionalStyles?: any;
	icon?: any;
}

export function Button({
	label,
	click,
	aditionalStyles,
	icon,
}: Readonly<Props>) {
	return (
		<button
			onClick={() => click()}
			className={`${styles.button} ${aditionalStyles}`}
		>
			{label} {icon}
		</button>
	);
}

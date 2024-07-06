import styles from "./button.module.css";

interface Props {
	label: string;
	click: () => void;
	aditionalStyles?: any;
	aditionalStyles2?: any;
	icon?: any;
}

export function Button({
	label,
	click,
	aditionalStyles,
	aditionalStyles2,
	icon,
}: Readonly<Props>) {
	return (
		<button
			onClick={() => click()}
			className={`${styles.button} ${aditionalStyles} ${aditionalStyles2}`}
		>
			{label}&nbsp;&nbsp;{icon}
		</button>
	);
}

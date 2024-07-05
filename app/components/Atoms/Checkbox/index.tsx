import styles from "./checkbox.module.css";
interface ICheckbox {
	ariaLabel?: string;
	id: string;
	checked: boolean;
	handleChange: () => any;
	label?: string;
	aditionalStyles?: any;
}

export const Checkbox = ({
	ariaLabel,
	id,
	checked,
	handleChange,
	label,
	aditionalStyles,
}: ICheckbox): JSX.Element => {
	return (
		<div className={`${styles.checkboxContainer} ${aditionalStyles}`}>
			<input
				className={styles.checkbox}
				type="checkbox"
				aria-label={ariaLabel}
				id={id}
				checked={checked}
				onChange={handleChange}
			/>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
		</div>
	);
};

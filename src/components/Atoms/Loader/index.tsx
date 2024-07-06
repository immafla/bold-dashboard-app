import styles from "./loader.module.css";
interface Props {
	aditionalStyles?: any;
}
export function Loader({ aditionalStyles }: Readonly<Props>) {
	return (
		<div className={`${styles.containerLoader} `}>
			<div className={styles.loader} />
		</div>
	);
}

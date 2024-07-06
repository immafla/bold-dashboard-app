import styles from "./loader.module.css";
export function Loader() {
	return (
		<div className={styles.containerLoader}>
			<div className={styles.loader} />
		</div>
	);
}

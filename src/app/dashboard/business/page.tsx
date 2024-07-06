import { CardResumeSales, Filter, TableTransactions } from "@/components";

import styles from "./business.module.css";

export default function Business() {
	return (
		<section className={styles.dashboardContainer}>
			<CardResumeSales />
			<Filter />
			<TableTransactions />
		</section>
	);
}

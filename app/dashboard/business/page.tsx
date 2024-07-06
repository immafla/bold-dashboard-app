"use client";
import {
	CardResumeSales,
	Filter,
	Loader,
	TableTransactions,
} from "@/components";
import { Suspense, useEffect, useState } from "react";

import { getTransactions } from "@/app/actions";
import { DataTransactions } from "@/interfaces";
import styles from "./business.module.css";

export default function Business() {
	const [totalData, setTotalData] = useState<DataTransactions[]>();

	useEffect(() => {
		getTransactions().then((res) => {
			if (res) {
				setTotalData(res.data);
			}
		});
	}, []);

	return totalData?.length ? (
		<section className={styles.dashboardContainer}>
			<Suspense fallback={<Loader />}>
				<CardResumeSales />
				<Filter />
				<TableTransactions data={totalData} />
			</Suspense>
		</section>
	) : (
		<Loader />
	);
}

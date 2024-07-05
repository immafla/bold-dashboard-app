"use client";
import {
	CardResumeSales,
	Filter,
	Loader,
	TableTransactions,
} from "@/components";
import { Suspense, useEffect, useState } from "react";

import { DataTransactions } from "@/interfaces";
import styles from "./business.module.css";

export default function Business() {
	const [totalData, setTotalData] = useState<DataTransactions[]>();

	async function getData() {
		const res = await fetch("https://bold-fe-api.vercel.app/api");
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		const resultData = await res.json();
		setTotalData(resultData.data);
	}

	useEffect(() => {
		getData();
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

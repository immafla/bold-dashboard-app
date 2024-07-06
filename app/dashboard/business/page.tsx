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
import data from "./data.json";

export default function Business() {
	const [totalData, setTotalData] = useState<DataTransactions[]>(
		data as DataTransactions[]
	);

	async function getData() {
		const res = await fetch("/api");
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		const resultData = await res.json();
		setTotalData(resultData.data);
	}

	useEffect(() => {
		//getData();
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

"use client";
import { Card, Filter, TableTransactions } from "@/components";
import { getCurrentMonthInWords, getCurrentYearInWords } from "@/functions";
import { DataTransactions } from "@/interfaces";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import data from "./data.json";

export default function Dashboard() {
	const [totalSales, setTotalSales] = useState<any>(0);
	const [defaultOptionRange, setDefaultOptionRange] = useState<any>(0);
	const [totalData, setTotalData] = useState<DataTransactions[]>(
		data as DataTransactions[]
	);

	useEffect(() => {
		const total = data.reduce((acc, curr) => {
			return acc + curr.amount;
		}, 0);

		setTotalSales(
			total.toLocaleString("es-CO", {
				style: "currency",
				currency: "COP",
				maximumFractionDigits: 0,
			})
		);
	}, []);

	return (
		<section className={styles.dashboardContainer}>
			<Card
				title={`Total ventas de ${defaultOptionRange}`}
				helpText="Texto de ayuda"
				showHelpIcon={true}
				adicionalStyles={styles.card}
			>
				<p className={styles.cardTotalSales}>{totalSales}</p>
				<br></br>
				<p>{`${getCurrentMonthInWords()} ${getCurrentYearInWords()}`}</p>
				<br></br>
			</Card>

			<div className={styles.filters}>
				<Filter
					defaultOptionRange={(value) => setDefaultOptionRange(value)}
					typeSaleOption={(value) => console.log({ value })}
				/>
			</div>

			<Card
				title={`Tus ventas de ${defaultOptionRange}`}
				helpText="Texto de ayuda"
				showHelpIcon={false}
				adicionalStyles={styles.cardTable}
			>
				<TableTransactions data={totalData} />
			</Card>
		</section>
	);
}

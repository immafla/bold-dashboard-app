"use client";
import { Card, Filter, TableTransactions } from "@/components";
import { getCurrentMonthInWords, getCurrentYearInWords } from "@/functions";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import data from "./data.json";

interface DataTransactions {
	id?: string;
	status: "REJECTED" | "SUCCESSFUL";
	paymentMethod?: string;
	salesType?: string;
	createdAt?: number;
	transactionReference?: number;
	amount: number;
	deduction?: number;
	franchise?: string;
}

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
			<div className={styles.card}>
				<Card
					title={`Total ventas de ${defaultOptionRange}`}
					helpText="Texto de ayuda"
				>
					<p className={styles.cardTotalSales}>{totalSales}</p>
					<br></br>
					<p>{`${getCurrentMonthInWords()} ${getCurrentYearInWords()}`}</p>
					<br></br>
				</Card>
			</div>

			<div className={styles.filters}>
				<Filter
					defaultOptionRange={(value) => setDefaultOptionRange(value)}
					typeSaleOption={(value) => console.log({ value })}
				/>
			</div>

			<div className={styles.cardTable}>
				<Card
					title={`Tus ventas de ${defaultOptionRange}`}
					helpText="Texto de ayuda"
				>
					<TableTransactions data={totalData} />
				</Card>
			</div>
		</section>
	);
}

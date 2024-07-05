"use client";
import { DataTransactions } from "@/app/interfaces";
import { getCurrentMonthInWords, getCurrentYearInWords } from "@/functions";
import { useGlobalContext } from "@/providers";
import { useEffect, useState } from "react";
import { Card } from "../Card";
import styles from "./cardResumeSales.module.css";

export function CardResumeSales() {
	const [totalSales, setTotalSales] = useState<any>(0);
	const { filteredTransactions, currentFilter } = useGlobalContext();

	useEffect(() => {
		if (filteredTransactions) {
			const total = filteredTransactions.reduce(
				(acc, curr: DataTransactions) => {
					return acc + curr.amount;
				},
				0
			);

			setTotalSales(
				total.toLocaleString("es-CO", {
					style: "currency",
					currency: "COP",
					maximumFractionDigits: 0,
				})
			);
		}
	}, [filteredTransactions]);

	return (
		<Card
			title={`Total ventas de ${currentFilter}`}
			helpText="Texto de ayuda"
			showHelpIcon={true}
			adicionalStyles={styles.card}
		>
			<p className={styles.cardTotalSales}>{totalSales}</p>
			<br></br>
			<p>{`${getCurrentMonthInWords()} ${getCurrentYearInWords()}`}</p>
			<br></br>
		</Card>
	);
}

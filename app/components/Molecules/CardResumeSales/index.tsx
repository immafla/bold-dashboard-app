"use client";
import { DataTransactions } from "@/app/interfaces";
import {
	DefaultRangeDates,
	getCurrentMonthInWords,
	getCurrentYearInWords,
	getDateTodayWithFormat,
	getRangeOfThisWeek,
} from "@/functions";
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
			title={`Total ventas de ${
				currentFilter == DefaultRangeDates.TODAY
					? "hoy"
					: currentFilter == DefaultRangeDates.THIS_WEEK
					? "esta semana"
					: getCurrentMonthInWords().toLowerCase()
			}`}
			helpText="Texto de ayuda"
			showHelpIcon={true}
			adicionalStylesBody={styles.card}
		>
			<p className={styles.cardTotalSales}>{totalSales}</p>
			<br></br>
			<p>{`${
				currentFilter == DefaultRangeDates.TODAY
					? getDateTodayWithFormat()
					: currentFilter == DefaultRangeDates.THIS_WEEK
					? getRangeOfThisWeek()
					: getCurrentMonthInWords() + " " + getCurrentYearInWords()
			}`}</p>
			<br></br>
		</Card>
	);
}

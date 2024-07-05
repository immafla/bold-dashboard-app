"use client";
import { formatTimestamp, parseStatusTransaction } from "@/functions";
import { LinkPay, Pay } from "@/icons";
import { DataTransactions } from "@/interfaces";
import { useGlobalContext } from "@/providers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "../Card";
import { DetailReport } from "../DetailReport";
import styles from "./tableTransactions.module.css";
interface Props {
	data: DataTransactions[];
}

const columns = [
	{
		id: "1",
		headerName: "Transación",
	},
	{
		id: "2",
		headerName: "Fecha y hora",
	},
	{
		id: "3",
		headerName: "Método de pago",
	},
	{
		id: "4",
		headerName: "ID Transacción Bold",
	},
	{
		id: "5",
		headerName: "Monto",
	},
];

export function TableTransactions({ data }: Readonly<Props>) {
	const [currentDataTable, setCurrentDataTable] =
		useState<DataTransactions[]>(data);
	const [detail, setDetail] = useState<boolean>(false);
	const [transactionRowSelected, setTransactionRowSelected] =
		useState<DataTransactions>();
	const { setFilteredTransactions, currentFilter } = useGlobalContext();

	const filterResults = (value: string) => {
		const normalizedValue = value.toUpperCase();
		const dataTableFiltered = currentDataTable.filter(
			(item: DataTransactions) => {
				return (
					item.status.includes(normalizedValue) ||
					item.id?.includes(normalizedValue) ||
					item.paymentMethod?.includes(normalizedValue)
				);
			}
		);
		setCurrentDataTable(dataTableFiltered);
	};

	useEffect(() => {
		if (transactionRowSelected) {
			setDetail((prevState) => !prevState);
		}
	}, [transactionRowSelected]);

	useEffect(() => {
		if (data) {
			let dataFiltered: DataTransactions[] = [];

			if (currentFilter == "hoy") {
				const startOfDay = new Date();
				startOfDay.setHours(0, 0, 0, 0);
				const endOfDay = new Date();
				endOfDay.setHours(23, 59, 59);
				dataFiltered = data.filter((transaction) => {
					const createdAtDate = new Date(transaction.createdAt);
					return (
						createdAtDate >= startOfDay && createdAtDate <= endOfDay
					);
				});
			}

			if (currentFilter == "esta semana") {
				const currentDate = new Date();
				const firstDayOfWeek = new Date(
					currentDate.setDate(
						currentDate.getDate() - currentDate.getDay() + 1
					)
				);
				firstDayOfWeek.setHours(0, 0, 0, 0);

				const lastDayOfWeek = new Date(
					currentDate.setDate(
						currentDate.getDate() - currentDate.getDay() + 7
					)
				);
				lastDayOfWeek.setHours(23, 59, 59);

				dataFiltered = data.filter((transaction) => {
					const createdAtDate = new Date(transaction.createdAt);
					return (
						createdAtDate >= firstDayOfWeek &&
						createdAtDate <= lastDayOfWeek
					);
				});
			}

			if (currentFilter == "este mes") {
				const currentDate = new Date();
				const firstDayOfMonth = new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					1
				);
				firstDayOfMonth.setHours(0, 0, 0, 0);

				const lastDayOfMonth = new Date(
					currentDate.getFullYear(),
					currentDate.getMonth() + 1,
					0
				);
				lastDayOfMonth.setHours(23, 59, 59);

				dataFiltered = data.filter((transaction) => {
					const createdAtDate = new Date(transaction.createdAt);
					return (
						createdAtDate >= firstDayOfMonth &&
						createdAtDate <= lastDayOfMonth
					);
				});
			}

			const dataTable = dataFiltered.toSorted(
				(a, b) => b.createdAt - a.createdAt
			);
			setCurrentDataTable(dataTable);
			setFilteredTransactions(dataTable);
		}
	}, [currentFilter, data]);

	return (
		<Card
			title={`Tus ventas de ${currentFilter}`}
			helpText="Texto de ayuda"
			showHelpIcon={false}
			adicionalStyles={styles.cardTable}
		>
			<DetailReport
				detail={detail}
				showDetail={() => setDetail((prevState) => !prevState)}
				transactionInfo={transactionRowSelected}
			/>
			<input
				type="text"
				placeholder="Buscar"
				className={styles.searchInput}
				onChange={(e) => filterResults(e.target.value)}
			/>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.tableHead}>
						<tr className={styles.tr}>
							{columns.map((element) => (
								<th key={element.id} className={styles.thead}>
									{element.headerName}
								</th>
							))}
						</tr>
					</thead>

					<tbody className={styles.tableBody}>
						{currentDataTable.map((element) => {
							return (
								<tr
									key={element.id}
									className={styles.tr}
									onClick={() => {
										setTransactionRowSelected(element);
									}}
								>
									{/* Transación */}
									<td className={`${styles.td} `}>
										<div
											className={`${styles.transaction}`}
										>
											{element.salesType == "TERMINAL" ? (
												<Pay />
											) : (
												<LinkPay />
											)}

											<p>
												{parseStatusTransaction(
													element.status
												)}
											</p>
										</div>
									</td>

									{/* Fecha y hora */}
									<td className={styles.td}>
										{formatTimestamp(element.createdAt)}
									</td>

									{/* Método de pago */}
									<td className={`${styles.td} `}>
										<div
											className={`${styles.paymentMethod}`}
										>
											{element.franchise ? (
												<>
													<Image
														src={`/${element.franchise}.png`}
														alt={`${element.paymentMethod}`}
														width={40}
														height={40}
													/>
													****
													{
														element.transactionReference
													}
												</>
											) : (
												<>
													<Image
														src={`/${element.paymentMethod}.png`}
														alt={`${element.paymentMethod}`}
														width={40}
														height={40}
													/>
													{element.paymentMethod}
												</>
											)}
										</div>
									</td>

									{/* ID Transacción Bold */}
									<td className={styles.td}>{element.id}</td>

									{/* Monto */}
									<td className={styles.td}>
										{element.amount.toLocaleString(
											"es-CO",
											{
												style: "currency",
												currency: "COP",
												maximumFractionDigits: 0,
											}
										)}
										{element.deduction ? (
											<>
												<p>Deducción Bold</p>
												<p>
													{element.deduction.toLocaleString(
														"es-CO",
														{
															style: "currency",
															currency: "COP",
															maximumFractionDigits: 0,
														}
													)}
												</p>
											</>
										) : (
											<></>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</Card>
	);
}

"use client";
import {
	DefaultRangeDates,
	filterTransactionsByThisMonth,
	filterTransactionsByThisWeek,
	filterTransactionsByToday,
	formatTimestamp,
	getCurrentMonthInWords,
	parseStatusTransaction,
	SaleType,
} from "@/functions";
import { LinkPay, Pay, Search } from "@/icons";
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
	const [originalDataTable] = useState<DataTransactions[]>(data);
	const [currentDataTable, setCurrentDataTable] =
		useState<DataTransactions[]>(data);
	const [detail, setDetail] = useState<boolean>(false);
	const [transactionRowSelected, setTransactionRowSelected] =
		useState<DataTransactions>();
	const { setFilteredTransactions, currentFilter, filterSaleType } =
		useGlobalContext();

	const filterResults = (value: string) => {
		if (!value.length) {
			setCurrentDataTable(originalDataTable);
		} else {
			const normalizedValue = value.toUpperCase();
			const dataTableFiltered = currentDataTable.filter(
				(item: DataTransactions) => {
					return (
						(item.status == "REJECTED"
							? "Cobro no realizado".includes(normalizedValue)
							: "Cobro exitoso".includes(normalizedValue)) ||
						item.id?.includes(normalizedValue) ||
						item.paymentMethod?.includes(normalizedValue) ||
						item.franchise?.includes(normalizedValue) ||
						item.amount.toString().includes(normalizedValue) ||
						item.deduction?.toString().includes(normalizedValue) ||
						formatTimestamp(item.createdAt).includes(
							normalizedValue
						)
					);
				}
			);
			setCurrentDataTable(dataTableFiltered);
		}
	};

	const initialStatusTx: DataTransactions = {
		id: "",
		status: "REJECTED",
		paymentMethod: "",
		salesType: "",
		createdAt: 0,
		transactionReference: 0,
		amount: 0,
		deduction: 0,
		franchise: "",
	};

	useEffect(() => {
		if (data) {
			let dataFiltered: DataTransactions[] = [];

			if (currentFilter == DefaultRangeDates.TODAY) {
				dataFiltered = filterTransactionsByToday(data);
			}

			if (currentFilter == DefaultRangeDates.THIS_WEEK) {
				dataFiltered = filterTransactionsByThisWeek(data);
			}

			if (currentFilter == DefaultRangeDates.THIS_MONTH) {
				dataFiltered = filterTransactionsByThisMonth(data);
			}

			if (filterSaleType == SaleType.ALL) {
				dataFiltered = dataFiltered.filter(
					(transaction) =>
						transaction.salesType == SaleType.PAYMENT_LINK ||
						transaction.salesType == SaleType.TERMINAL
				);
			} else {
				dataFiltered = dataFiltered.filter(
					(transaction) => transaction.salesType == filterSaleType
				);
			}

			setCurrentDataTable(dataFiltered);
			setFilteredTransactions(dataFiltered);
		}
	}, [currentFilter, filterSaleType, data]);

	return (
		<Card
			title={`Tus ventas de ${
				currentFilter == DefaultRangeDates.TODAY
					? "hoy"
					: currentFilter == DefaultRangeDates.THIS_WEEK
					? "esta semana"
					: getCurrentMonthInWords().toLowerCase()
			}`}
			helpText="Texto de ayuda"
			showHelpIcon={false}
			adicionalStyles={styles.cardTable}
		>
			<DetailReport
				detail={detail}
				showDetail={() => setDetail((prevState) => !prevState)}
				transactionInfo={transactionRowSelected || initialStatusTx}
			/>

			<div className={styles.inputContainer}>
				<input
					type="text"
					placeholder="Buscar"
					className={styles.searchInput}
					onChange={(e) => filterResults(e.target.value)}
				/>
				<span className={styles.icon}>
					<Search color="#b4b4b4" />
				</span>
			</div>

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
						{currentDataTable?.map((element) => {
							return (
								<tr
									key={element.id}
									className={styles.tr}
									onClick={() => {
										setDetail((prevState) => !prevState);
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
										<p className={styles.amountDetail}>
											{element.amount.toLocaleString(
												"es-CO",
												{
													style: "currency",
													currency: "COP",
													maximumFractionDigits: 0,
												}
											)}
										</p>
										{element.deduction ? (
											<>
												<p className={styles.deduction}>
													Deducción Bold
												</p>
												<p
													className={
														styles.deductionAmount
													}
												>
													-
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

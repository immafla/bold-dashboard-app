"use client";
import { getTransactions } from "@/actions";
import {
	DefaultRangeDates,
	filterTransactionsByThisMonth,
	filterTransactionsByThisWeek,
	filterTransactionsByToday,
	formatTimestamp,
	getCurrentMonthInWords,
	parseStatusTransaction,
	SaleType,
	toUpperCamelCase,
} from "@/functions";
import { LinkPay, Pay, Search } from "@/icons";
import { DataTransactions } from "@/interfaces";
import { useGlobalContext } from "@/providers";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "../../Atoms";
import { Card } from "../Card";
import { DetailReport } from "../DetailReport";
import { columns } from "./columns";
import styles from "./tableTransactions.module.css";

export function TableTransactions() {
	const [originalDataTable, setOriginalDataTable] = useState<
		DataTransactions[]
	>([]);
	const [currentDataTable, setCurrentDataTable] = useState<
		DataTransactions[]
	>([]);
	const [detail, setDetail] = useState<boolean>(false);
	const [transactionRowSelected, setTransactionRowSelected] =
		useState<DataTransactions>();
	const { setFilteredTransactions, currentFilter, filterSaleType } =
		useGlobalContext();

	const [currentTotalFilteredData, setCurrentTotalFilteredData] = useState<
		DataTransactions[]
	>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage] = useState(5);
	const [pageNumbers, setPageNumbers] = useState<any[]>([]);

	const searchFilter = (value: string) => {
		if (!value.length) {
			setCurrentDataTable(originalDataTable);
		} else {
			const normalizedValue = value.toUpperCase();
			const dataTableFiltered = originalDataTable.filter(
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

	const paginateTable = (
		pageNumber: number,
		data: any[] = currentTotalFilteredData
	) => {
		const indexOfLastRow = pageNumber * rowsPerPage;
		const indexOfFirstRow = indexOfLastRow - rowsPerPage;
		const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
		return currentRows;
	};
	useEffect(() => {
		if (originalDataTable) {
			let dataFiltered: DataTransactions[] = [];

			if (currentFilter == DefaultRangeDates.TODAY) {
				dataFiltered = filterTransactionsByToday(originalDataTable);
			} else if (currentFilter == DefaultRangeDates.THIS_WEEK) {
				dataFiltered = filterTransactionsByThisWeek(originalDataTable);
			} else if (currentFilter == DefaultRangeDates.THIS_MONTH) {
				dataFiltered = filterTransactionsByThisMonth(originalDataTable);
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
			setCurrentTotalFilteredData(dataFiltered);
			setCurrentDataTable(paginateTable(1, dataFiltered));

			setFilteredTransactions(dataFiltered);
		}
	}, [currentFilter, filterSaleType, originalDataTable]);

	useEffect(() => {
		let arrayNumbers = [];
		for (
			let i = 1;
			i <= Math.ceil(currentTotalFilteredData.length / rowsPerPage);
			i++
		) {
			arrayNumbers.push(i);
		}
		setPageNumbers(arrayNumbers);
	}, [currentTotalFilteredData]);

	useEffect(() => {
		getTransactions().then((res) => {
			if (res) {
				setOriginalDataTable(res.data);
				setCurrentDataTable(res.data);
			}
		});
	}, []);

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
					onChange={(e) => searchFilter(e.target.value)}
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
						<Suspense fallback={<Loader />}>
							{currentDataTable.map((element) => {
								return (
									<tr
										key={element.id}
										className={styles.tr}
										onClick={() => {
											setDetail(
												(prevState) => !prevState
											);
											setTransactionRowSelected(element);
										}}
									>
										{/* Transación */}
										<td className={`${styles.td} `}>
											<div
												className={`${styles.transaction}`}
											>
												{element.salesType ==
												"TERMINAL" ? (
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
														{toUpperCamelCase(
															element.paymentMethod!
														)}
													</>
												)}
											</div>
										</td>

										{/* ID Transacción Bold */}
										<td className={styles.td}>
											{element.id}
										</td>

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
													<p
														className={
															styles.deduction
														}
													>
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
						</Suspense>
						{/* {currentDataTable.length ? (
							
						) : (
							<div>
								<Loader />
							</div>
						)} */}
					</tbody>
				</table>
			</div>

			<ul className={styles.pagination}>
				{pageNumbers.map((number, index) => (
					<li key={number}>
						<button
							className={`${styles.boton} ${
								currentPage === number ? styles.active : ""
							}`}
							onClick={() => {
								setCurrentPage(number);
								setCurrentDataTable(paginateTable(number));
							}}
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</Card>
	);
}

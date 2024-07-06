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
	useWindowDimensions,
} from "@/functions";
import { LinkPay, Pay, Search } from "@/icons";
import { DataTransactions } from "@/interfaces";
import { useGlobalContext } from "@/providers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader } from "../../Atoms";
import { Card } from "../Card";
import { DetailReport } from "../DetailReport";
import { columns, columnsResponsive } from "./columns";
import styles from "./tableTransactions.module.css";

export function TableTransactions() {
	const [originalDataTable, setOriginalDataTable] = useState<
		DataTransactions[]
	>([]);
	const [currentDataTable, setCurrentDataTable] = useState<
		DataTransactions[]
	>([]);
	const [loading, setLoading] = useState(true);
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
	const windowWidth = useWindowDimensions();

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
		getTransactions()
			.then((res) => {
				if (res) {
					setOriginalDataTable(res.data);
					setCurrentDataTable(res.data);
				}
			})
			.catch((e) => console.log("Error getting data table =>", e))
			.finally(() => setLoading(false));
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
							{windowWidth < 720
								? columnsResponsive.map((element) => (
										<th
											key={element.id}
											className={styles.thead}
										>
											{element.headerName}
										</th>
								  ))
								: columns.map((element) => (
										<th
											key={element.id}
											className={styles.thead}
										>
											{element.headerName}
										</th>
								  ))}
						</tr>
					</thead>

					<tbody className={styles.tableBody}>
						{loading ? (
							<tr>
								<td
									colSpan={5}
									style={{
										textAlign: "center",
										marginTop: "50%",
									}}
								>
									<Loader />
								</td>
							</tr>
						) : (
							currentDataTable.map((element) => {
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
										{windowWidth < 720 ? (
											<td
												className={`${styles.td} ${styles.tdCollapsed}`}
											>
												{/* Transaccion */}
												<div
													className={`${styles.tdCollapsedTx}`}
												>
													{element.salesType ==
													"TERMINAL" ? (
														<Pay />
													) : (
														<LinkPay />
													)}

													<p
														style={{
															fontWeight: 600,
														}}
													>
														{parseStatusTransaction(
															element.status
														)}
													</p>
												</div>

												{/* Fecha y hora */}
												<div
													className={`${styles.tdCollapsedDate}`}
												>
													<p
														style={{
															fontWeight: 600,
														}}
													>
														Fecha y hora
													</p>
													<p
														style={{
															color: "#b1b1b1",
														}}
													>
														{formatTimestamp(
															element.createdAt
														)}
													</p>
												</div>

												{/* Método de pago  */}
												<div
													className={`${styles.tdCollapsedDate}`}
												>
													<p
														style={{
															fontWeight: 600,
														}}
													>
														Método de pago
													</p>
													{element.franchise ? (
														<div
															style={{
																display: "flex",
																flexDirection:
																	"row",
																alignItems:
																	"center",
															}}
														>
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
														</div>
													) : (
														<div
															style={{
																display: "flex",
																flexDirection:
																	"row",
																alignItems:
																	"center",
															}}
														>
															<Image
																src={`/${element.paymentMethod}.png`}
																alt={`${element.paymentMethod}`}
																width={40}
																height={40}
															/>
															{toUpperCamelCase(
																element.paymentMethod!
															)}
														</div>
													)}
												</div>

												{/* ID Transacción Bold  */}
												<div
													className={`${styles.tdCollapsedDate}`}
												>
													<p
														style={{
															fontWeight: 600,
														}}
													>
														ID Transacción Bold
													</p>
													<p
														style={{
															color: "#b1b1b1",
														}}
													>
														{element.id}
													</p>
												</div>

												{/* Monto */}
												<div>
													<p
														className={
															styles.amountDetail
														}
													>
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
																		currency:
																			"COP",
																		maximumFractionDigits: 0,
																	}
																)}
															</p>
														</>
													) : (
														<></>
													)}
												</div>
											</td>
										) : (
											<>
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
													{formatTimestamp(
														element.createdAt
													)}
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
													<p
														className={
															styles.amountDetail
														}
													>
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
																		currency:
																			"COP",
																		maximumFractionDigits: 0,
																	}
																)}
															</p>
														</>
													) : (
														<></>
													)}
												</td>
											</>
										)}
									</tr>
								);
							})
						)}
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

"use client";
import { formatTimestamp } from "@/app/utils/functions";
import { LinkPay, Pay } from "@/icons";
import { DataTransactions } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
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
	const [detail, setDetail] = useState<boolean>(false);
	const [transactionInfo, setTransactionInfo] = useState<DataTransactions>();

	enum StatusTransaction {
		REJECTED = "Cobro no realizado",
		SUCCESSFUL = "Cobro exitoso",
	}

	const parseStatus = (status: "REJECTED" | "SUCCESSFUL") => {
		return StatusTransaction[status];
	};

	useEffect(() => {
		if (transactionInfo) {
			setDetail((prevState) => !prevState);
		}
	}, [transactionInfo]);

	return (
		<>
			<input
				type="text"
				placeholder="Buscar"
				className={styles.searchInput}
			/>
			<DetailReport
				detail={detail}
				showDetail={() => setDetail((prevState) => !prevState)}
				transactionInfo={transactionInfo}
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
						{data.map((element) => {
							return (
								<tr
									key={element.id}
									className={styles.tr}
									onClick={() => {
										setTransactionInfo(element);
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

											<p>{parseStatus(element.status)}</p>
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
														width={50}
														height={50}
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
														width={50}
														height={50}
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
		</>
	);
}

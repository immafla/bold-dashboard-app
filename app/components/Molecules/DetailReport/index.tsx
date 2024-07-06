"use client";
import { DataTransactions } from "@/app/interfaces";
import { formatTimestamp, SaleType } from "@/functions";
import { CheckOk, ErrorIcon, LinkPay, Pay } from "@/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./detailReport.module.css";

interface Props {
	showDetail: () => void;
	detail: any;
	transactionInfo: DataTransactions;
}

export function DetailReport({ showDetail, detail, transactionInfo }: Props) {
	const ANIMATION_MENU_DURATION = 500;
	const [showDetailBar, setShowDetailBar] = useState(false);
	// const locales = { es };

	useEffect(() => {
		if (detail) {
			setShowDetailBar(true);
		} else {
			setTimeout(() => setShowDetailBar(false), ANIMATION_MENU_DURATION);
		}
	}, [detail]);

	return (
		showDetailBar && (
			<div className={styles.containerDetailReport}>
				<div
					className={`${styles.detailReportBody} ${
						detail ? styles.slideLeft : styles.slideRight
					}`}
				>
					<div className={styles.detailReportBodyData}>
						<button
							className={styles.detailReportResumeGoBack}
							onClick={() => showDetail()}
						>
							x
						</button>
						<section className={styles.resumeReport}>
							<div className={styles.icon}>
								{transactionInfo?.status == "REJECTED" ? (
									<ErrorIcon
										color="#ec424e"
										width="40px"
										height="40px"
									/>
								) : (
									<CheckOk
										color="#79e7ba"
										width="40px"
										height="40px"
									/>
								)}
							</div>
							<div className={styles.status}>
								<p>
									{transactionInfo?.status == "REJECTED"
										? "Cobro no realizado"
										: "Cobro exitoso"}
								</p>
							</div>
							<div className={styles.amount}>
								<p>
									{transactionInfo?.amount.toLocaleString(
										"es-CO",
										{
											style: "currency",
											currency: "COP",
											maximumFractionDigits: 0,
										}
									)}
								</p>
							</div>
							<div className={styles.date}>
								<p>
									{formatTimestamp(
										transactionInfo!.createdAt
									)}
								</p>
							</div>
						</section>

						<section className={styles.detailResumeReport}>
							<div className={styles.rowDetail}>
								<p className={styles.key}>
									ID transacción Bold
								</p>
								<p className={styles.value}>
									{transactionInfo?.id}
								</p>
							</div>

							{transactionInfo?.status != "REJECTED" &&
								transactionInfo?.deduction && (
									<div className={styles.rowDetail}>
										<p className={styles.key}>
											Deducción Bold
										</p>
										<p className={styles.valueError}>
											-
											{transactionInfo?.deduction.toLocaleString(
												"es-CO",
												{
													style: "currency",
													currency: "COP",
													maximumFractionDigits: 0,
												}
											)}
										</p>
									</div>
								)}

							<hr></hr>
							<div className={styles.rowDetail}>
								<p className={styles.key}>Método de pago</p>
								<div className={`${styles.paymentMethod}`}>
									{transactionInfo?.franchise ? (
										<>
											<Image
												src={`/${transactionInfo?.franchise}.png`}
												alt={`${transactionInfo?.paymentMethod}`}
												width={30}
												height={30}
											/>
											****
											{
												transactionInfo?.transactionReference
											}
										</>
									) : (
										<>
											<Image
												src={`/${transactionInfo?.paymentMethod}.png`}
												alt={`${transactionInfo?.paymentMethod}`}
												width={30}
												height={30}
											/>
											{transactionInfo?.paymentMethod}
										</>
									)}
								</div>
							</div>

							<div className={styles.rowDetail}>
								<p className={styles.key}>Tipo de pago</p>
								<div className={`${styles.transaction}`}>
									{transactionInfo?.salesType ==
									"TERMINAL" ? (
										<Pay width="16px" height="16px" />
									) : (
										<LinkPay width="16px" height="16px" />
									)}
									<strong>
										<p>
											{transactionInfo?.salesType ==
											SaleType.TERMINAL
												? "Datáfono"
												: "Link de pagos"}
										</p>
									</strong>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		)
	);
}

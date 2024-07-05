"use client";
import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { es } from "date-fns/locale";
// import { saveTransactionInfoIndexDB } from "../../../../tools/ngforage.config";
// import { URL_PATHS } from "../../../Routes/Url-paths";
// import { bankName, documentType, Icons } from "../../../utils/icons/constants";
// import Button from "../../atoms/button/Button";
// import Image from "../../atoms/image/Image";
// import "./Detail-report.scss";
import { DataTransactions } from "@/app/interfaces";
import styles from "./detailReport.module.css";

interface Props {
	showDetail: () => void;
	detail: any;
	transactionInfo?: DataTransactions;
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
						{transactionInfo.status}
					</div>
				</div>
			</div>
		)
	);
}

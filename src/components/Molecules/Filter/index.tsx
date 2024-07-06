"use client";
import { Button, Checkbox } from "@/components";
import {
	DefaultRangeDates,
	getCurrentMonthInWords,
	SaleType,
} from "@/functions";
import { FilterIcon, LinkPay, Pay } from "@/icons";
import { useGlobalContext } from "@/providers";
import { useEffect, useState } from "react";
import styles from "./filter.module.css";

export function Filter() {
	const [showFilter, setShowFilter] = useState(false);
	const [dataphone, setDataphone] = useState(false);
	const [link, setLink] = useState(false);
	const [all, setAll] = useState(false);
	const [allowUpdate, setAllowUpdate] = useState(true);

	const { currentFilter, setCurrentFilter, setFilterSaleType } =
		useGlobalContext();

	useEffect(() => {
		if (dataphone && link) {
			setAll(true);
			setAllowUpdate(true);
		} else {
			setAllowUpdate(false);
			setAll(false);
		}
	}, [link, dataphone]);

	useEffect(() => {
		if (all) {
			setAllowUpdate(true);
			setDataphone(true);
			setLink(true);
		}
		if (!all && allowUpdate) {
			setAllowUpdate(true);
			setDataphone(false);
			setLink(false);
		}
	}, [all, allowUpdate]);

	const setFilters = () => {
		if (dataphone && link) {
			setFilterSaleType(SaleType.ALL);
		} else {
			dataphone
				? setFilterSaleType(SaleType.TERMINAL)
				: setFilterSaleType(SaleType.ALL);

			if (link) {
				setFilterSaleType(SaleType.PAYMENT_LINK);
			}
		}
		setShowFilter((prevState) => !prevState);
	};

	return (
		<div className={styles.filters}>
			<div className={styles.filterDefaultsContainer}>
				<Button
					label="Hoy"
					click={() => {
						window.sessionStorage.setItem(
							"currentFilter",
							DefaultRangeDates.TODAY
						);
						setCurrentFilter(DefaultRangeDates.TODAY);
					}}
					aditionalStyles={styles.filterDefaultButton}
					aditionalStyles2={`${
						currentFilter == DefaultRangeDates.TODAY
							? styles.filterDefaultButtonSelected
							: null
					}`}
				/>
				<Button
					label="Esta semana"
					click={() => {
						window.sessionStorage.setItem(
							"currentFilter",
							DefaultRangeDates.THIS_WEEK
						);
						setCurrentFilter(DefaultRangeDates.THIS_WEEK);
					}}
					aditionalStyles={styles.filterDefaultButton}
					aditionalStyles2={`${
						currentFilter == DefaultRangeDates.THIS_WEEK
							? styles.filterDefaultButtonSelected
							: null
					}`}
				/>
				<Button
					label={`${getCurrentMonthInWords()}`}
					click={() => {
						window.sessionStorage.setItem(
							"currentFilter",
							DefaultRangeDates.THIS_MONTH
						);
						setCurrentFilter(DefaultRangeDates.THIS_MONTH);
					}}
					aditionalStyles={styles.filterDefaultButton}
					aditionalStyles2={`${
						currentFilter == DefaultRangeDates.THIS_MONTH
							? styles.filterDefaultButtonSelected
							: null
					}`}
				/>
			</div>
			<div className={styles.filterOptionsContainer}>
				<Button
					label={"Filtrar"}
					click={() => setShowFilter((prevState) => !prevState)}
					aditionalStyles={styles.filterButton}
					icon={<FilterIcon width="25px" height="25px" />}
				/>

				{showFilter ? (
					<div
						className={`${styles.filterOptions} ${styles.showFilterOptions}`}
					>
						<div>
							<header className={styles.headerFilterOptions}>
								<p>Filtrar</p>
								<button
									className={styles.closeFilter}
									onClick={() =>
										setShowFilter((prevState) => !prevState)
									}
								>
									<p>x</p>
								</button>
							</header>
							<section className={styles.filterOptionsTypes}>
								<Checkbox
									icon={<Pay width="18px" height="18px" />}
									label="Cobro con datafono"
									id="datafono"
									checked={dataphone}
									handleChange={() =>
										setDataphone(
											(prevStatus) => !prevStatus
										)
									}
								/>
								<Checkbox
									icon={
										<LinkPay width="18px" height="18px" />
									}
									label="Cobro con link de pago"
									id="link"
									checked={link}
									handleChange={() =>
										setLink((prevStatus) => !prevStatus)
									}
								/>
								<Checkbox
									label="Ver todos"
									id="todos"
									checked={all}
									handleChange={() =>
										setAll((prevStatus) => !prevStatus)
									}
								/>
							</section>
							<Button
								label="Aplicar"
								click={() => setFilters()}
								aditionalStyles={styles.filterOptionsButton}
							/>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

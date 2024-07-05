"use client";
import { Button, Checkbox } from "@/components";
import { DefaultRangeFilter, getCurrentMonthInWords } from "@/functions";
import { useGlobalContext } from "@/providers";
import { useEffect, useState } from "react";
import styles from "./filter.module.css";

export function Filter() {
	const [showFilter, setShowFilter] = useState(false);
	const [dataphone, setDataphone] = useState(false);
	const [link, setLink] = useState(false);
	const [all, setAll] = useState(false);
	const [allowUpdate, setAllowUpdate] = useState(true);

	const { currentFilter, setCurrentFilter } = useGlobalContext();

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

	return (
		<div className={styles.filters}>
			<div className={styles.filterDefaultsContainer}>
				<Button
					label="Hoy"
					click={() => {
						window.sessionStorage.setItem("currentFilter", "hoy");
						setCurrentFilter(DefaultRangeFilter.TODAY);
					}}
					aditionalStyles={styles.filterDefaultButton}
					aditionalStyles2={`${
						currentFilter == "hoy"
							? styles.filterDefaultButtonSelected
							: null
					}`}
				/>
				<Button
					label="Esta semana"
					click={() => {
						window.sessionStorage.setItem(
							"currentFilter",
							"esta semana"
						);
						setCurrentFilter(DefaultRangeFilter.THIS_WEEK);
					}}
					aditionalStyles={styles.filterDefaultButton}
					aditionalStyles2={`${
						currentFilter == "esta semana"
							? styles.filterDefaultButtonSelected
							: null
					}`}
				/>
				<Button
					label={`${getCurrentMonthInWords()}`}
					click={() => {
						window.sessionStorage.setItem(
							"currentFilter",
							"este mes"
						);
						setCurrentFilter(DefaultRangeFilter.THIS_MONTH);
					}}
					aditionalStyles={styles.filterDefaultButton}
					aditionalStyles2={`${
						currentFilter == "este mes"
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
				/>

				{showFilter ? (
					<div
						className={`${styles.filterOptions} ${styles.showFilterOptions}`}
					>
						<div>
							<header className={styles.headerFilterOptions}>
								<p>Filtrar</p>
								<a
									onClick={() =>
										setShowFilter((prevState) => !prevState)
									}
								>
									<p>x</p>
								</a>
							</header>
							<section className={styles.filterOptionsTypes}>
								<Checkbox
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
								click={() => console.log("hola")}
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

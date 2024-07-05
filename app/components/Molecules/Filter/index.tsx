"use client";
import { Button, Checkbox } from "@/components";
import { useState } from "react";
import styles from "./filter.module.css";

import { DefaultRangeFilter, getCurrentMonthInWords } from "@/functions";

interface Props {
	defaultOptionRange: (value: any) => void;
	typeSaleOption: (value: string) => void;
}

export function Filter({
	defaultOptionRange,
	typeSaleOption,
}: Readonly<Props>) {
	const [showFilter, setShowFilter] = useState(false);
	const [dataphone, setDataphone] = useState(false);
	const [link, setLink] = useState(false);
	const [all, setAll] = useState(false);

	return (
		<>
			<div className={styles.filterDefaultsContainer}>
				<Button
					label="Hoy"
					click={() => defaultOptionRange(DefaultRangeFilter.TODAY)}
					aditionalStyles={styles.filterDefaultButton}
				/>
				<Button
					label="Esta semana"
					click={() =>
						defaultOptionRange(DefaultRangeFilter.THIS_WEEK)
					}
					aditionalStyles={styles.filterDefaultButton}
				/>
				<Button
					label={`${getCurrentMonthInWords()}`}
					click={() =>
						defaultOptionRange(DefaultRangeFilter.THIS_MONTH)
					}
					aditionalStyles={styles.filterDefaultButton}
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
		</>
	);
}

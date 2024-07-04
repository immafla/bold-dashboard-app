import styles from "./tableTransactions.module.css";

interface Props {
	data: any[];
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

export function TableTransactions({ data }: Props) {
	enum StatusTransaction {
		REJECTED = "Cobro no realizado",
		SUCCESSFUL = "Cobro exitoso",
	}

	const parseStatus = (status: "REJECTED" | "SUCCESSFUL") => {
		return StatusTransaction[status];
	};

	return (
		<>
			<input
				type="text"
				placeholder="Buscar"
				className={styles.searchInput}
			/>
			<table className={styles.table}>
				<thead>
					<tr>
						{columns.map((element, index) => (
							<th key={element.id}>{element.headerName}</th>
						))}
					</tr>
				</thead>
				<tbody className={styles.tableBody}>
					{data.map((element) => {
						return (
							<tr key={element.id} className={styles.tr}>
								<td className={styles.td}>
									{parseStatus(element.status)}
								</td>
								<td className={styles.td}>
									{element.createdAt}
								</td>
								<td className={styles.td}>
									{element.paymentMethod}
								</td>
								<td className={styles.td}>{element.id}</td>
								<td className={styles.td}>
									{element.amount.toLocaleString("es-CO", {
										style: "currency",
										currency: "COP",
										maximumFractionDigits: 0,
									})}
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
		</>
	);
}

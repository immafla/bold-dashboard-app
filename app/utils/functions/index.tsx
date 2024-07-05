export function toUpperCamelCase(string: string) {
	return string
		.split(" ")
		.map(
			(palabra) =>
				palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
		)
		.join("");
}

export function getCurrentMonthInWords(): string {
	return toUpperCamelCase(
		new Date().toLocaleString("es-ES", { month: "long" })
	);
}

export function getCurrentYearInWords() {
	return toUpperCamelCase(
		new Date().toLocaleString("es-ES", { year: "numeric" })
	);
}

export function formatTimestamp(timestamp: number) {
	const date = new Date(timestamp);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

export enum DefaultRangeFilter {
	TODAY = "hoy",
	THIS_WEEK = "esta semana",
	THIS_MONTH = "este mes",
}

export enum StatusTransaction {
	REJECTED = "Cobro no realizado",
	SUCCESSFUL = "Cobro exitoso",
}

export function parseStatusTransaction(status: "REJECTED" | "SUCCESSFUL") {
	return StatusTransaction[status];
}

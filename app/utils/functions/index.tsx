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

export enum DefaultRangeFilter {
	TODAY = "hoy",
	THIS_WEEK = "esta semana",
	THIS_MONTH = "este mes",
}

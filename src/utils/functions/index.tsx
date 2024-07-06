import { DataTransactions } from "@/interfaces";

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

export function getRangeOfThisWeek() {
	const currentDate = new Date();
	const firstDayOfWeek = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
	);
	return `Desde el ${getDateTodayWithFormat(
		firstDayOfWeek,
		false
	)} hasta el ${getDateTodayWithFormat(undefined, false)}`;
}

export function getCurrentYearInWords() {
	return toUpperCamelCase(
		new Date().toLocaleString("es-ES", { year: "numeric" })
	);
}

export function getDateTodayWithFormat(
	customDate = new Date(),
	includeYear = true
) {
	const day = String(customDate.getDate()).padStart(2, "0");
	const year = customDate.getFullYear();
	return `${day} de ${getCurrentMonthInWords()} ${
		includeYear ? "del" + " " + year : ""
	}`;
}

export function formatTimestamp(timestamp: number) {
	const date = new Date(timestamp);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

export enum StatusTransaction {
	REJECTED = "Cobro no realizado",
	SUCCESSFUL = "Cobro exitoso",
}

export enum SaleType {
	PAYMENT_LINK = "PAYMENT_LINK",
	TERMINAL = "TERMINAL",
	ALL = "ALL",
}

export enum DefaultRangeDates {
	TODAY = "TODAY",
	THIS_WEEK = "THIS_WEEK",
	THIS_MONTH = "THIS_MONTH",
}

export function parseStatusTransaction(status: "REJECTED" | "SUCCESSFUL") {
	return StatusTransaction[status];
}

export function filterTransactionsByThisMonth(data: DataTransactions[]) {
	const currentDate = new Date();
	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);
	firstDayOfMonth.setHours(0, 0, 0, 0);
	const lastDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	);
	lastDayOfMonth.setHours(23, 59, 59);
	return data
		.filter((transaction) => {
			const createdAtDate = new Date(transaction.createdAt);
			return (
				createdAtDate >= firstDayOfMonth &&
				createdAtDate <= lastDayOfMonth
			);
		})
		.toSorted((a, b) => b.createdAt - a.createdAt);
}

export function filterTransactionsByThisWeek(data: DataTransactions[]) {
	const currentDate = new Date();
	const firstDayOfWeek = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
	);
	firstDayOfWeek.setHours(0, 0, 0, 0);

	const lastDayOfWeek = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)
	);
	lastDayOfWeek.setHours(23, 59, 59);

	return data
		.filter((transaction) => {
			const createdAtDate = new Date(transaction.createdAt);
			return (
				createdAtDate >= firstDayOfWeek &&
				createdAtDate <= lastDayOfWeek
			);
		})
		.toSorted((a, b) => b.createdAt - a.createdAt);
}

export function filterTransactionsByToday(data: DataTransactions[]) {
	const startOfDay = new Date();
	startOfDay.setHours(0, 0, 0, 0);
	const endOfDay = new Date();
	endOfDay.setHours(23, 59, 59);
	return data
		.filter((transaction) => {
			const createdAtDate = new Date(transaction.createdAt);
			return createdAtDate >= startOfDay && createdAtDate <= endOfDay;
		})
		.toSorted((a, b) => b.createdAt - a.createdAt);
}

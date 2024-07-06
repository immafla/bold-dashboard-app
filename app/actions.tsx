"use server";

export async function getTransactions() {
	const res = await fetch("https://bold-fe-api.vercel.app/api");
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return await res.json();
}

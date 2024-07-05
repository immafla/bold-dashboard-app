"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export const StateContext = createContext({
	currentFilter: "",
	setCurrentFilter: (value: any) => value,
	filteredTransactions: [],
	setFilteredTransactions: (value: any) => value,
});

export function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [currentFilter, setCurrentFilter] = useState<string>("");
	const [filteredTransactions, setFilteredTransactions] = useState([]);

	useEffect(() => {
		const DATA_STORAGE = window.sessionStorage.getItem("currentFilter");
		if (DATA_STORAGE) setCurrentFilter(DATA_STORAGE);
		else setCurrentFilter("hoy");
	}, []);

	const obj = useMemo(
		() => ({
			currentFilter,
			setCurrentFilter,
			filteredTransactions,
			setFilteredTransactions,
		}),
		[currentFilter, filteredTransactions]
	);

	return (
		<StateContext.Provider value={obj}>{children}</StateContext.Provider>
	);
}

export const useGlobalContext = () => useContext(StateContext);

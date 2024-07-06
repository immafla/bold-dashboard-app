"use client";

import { DefaultRangeDates, SaleType } from "@/functions";
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
	filterSaleType: SaleType.ALL,
	setFilterSaleType: (value: any) => value,
});

export function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [currentFilter, setCurrentFilter] = useState<string>("");
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [filterSaleType, setFilterSaleType] = useState(SaleType.ALL);

	useEffect(() => {
		const DATA_STORAGE = window.sessionStorage.getItem("currentFilter");
		if (DATA_STORAGE) setCurrentFilter(DATA_STORAGE);
		else setCurrentFilter(DefaultRangeDates.TODAY);
	}, []);

	const obj = useMemo(
		() => ({
			currentFilter,
			setCurrentFilter,
			filteredTransactions,
			setFilteredTransactions,
			filterSaleType,
			setFilterSaleType,
		}),
		[currentFilter, filteredTransactions, filterSaleType]
	);

	return (
		<StateContext.Provider value={obj}>{children}</StateContext.Provider>
	);
}

export const useGlobalContext = () => useContext(StateContext);

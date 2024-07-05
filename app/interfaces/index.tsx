export interface DataTransactions {
	id?: string;
	status: "REJECTED" | "SUCCESSFUL";
	paymentMethod?: string;
	salesType?: string;
	createdAt: number;
	transactionReference?: number;
	amount: number;
	deduction?: number;
	franchise?: string;
}

import { Header } from "@/components";
import styles from "./dashboard.module.css";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Header />
			<div className={styles.layoutContainer}>{children}</div>
		</>
	);
}

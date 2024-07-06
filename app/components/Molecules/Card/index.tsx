import { Help } from "@/icons";
import { ReactNode } from "react";
import styles from "./card.module.css";

interface Props {
	children: ReactNode;
	title: string;
	helpText: string;
	showHelpIcon: boolean;
	adicionalStyles?: any;
	adicionalStylesBody?: any;
}

export function Card({
	children,
	title,
	helpText,
	showHelpIcon,
	adicionalStyles,
	adicionalStylesBody,
}: Readonly<Props>) {
	return (
		<div className={`${styles.cardContainer} ${adicionalStyles}`}>
			<header className={styles.cardHeader}>
				<div>{title}</div>
				{showHelpIcon ? (
					<div>
						{/* {helpText} */}
						<Help width="25px" height="25px" />
					</div>
				) : (
					<></>
				)}
			</header>
			<section className={`${styles.bodySection} ${adicionalStylesBody}`}>
				{children}
			</section>
		</div>
	);
}

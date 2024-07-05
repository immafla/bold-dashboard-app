"use client";
import { Button } from "@/components";
import { Help } from "@/icons";
import Image from "next/image";
import styles from "./header.module.css";
export function Header() {
	return (
		<header className={styles.headerContainer}>
			<Image src={"/bold.svg"} alt="brand" width={150} height={80} />
			<section className={styles.navSection}>
				<Button label="Mi negocio" click={() => console.log("click")} />
				<Button
					label="Ayuda"
					click={() => console.log("click")}
					icon={<Help />}
					aditionalStyles={styles.buttonHelp}
				/>
			</section>
		</header>
	);
}

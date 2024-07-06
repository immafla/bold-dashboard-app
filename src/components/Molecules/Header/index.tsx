"use client";
import { Help } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
export function Header() {
	const pathname = usePathname();

	const links = [
		{ name: "Mi negocio", href: "/dashboard/business" },
		{
			name: "Ayuda",
			href: "/dashboard/help",
			icon: <Help />,
		},
	];

	return (
		<header className={styles.headerContainer}>
			<div className={styles.brandContainer}>
				<Image
					priority={true}
					src={"/bold.svg"}
					alt="brand"
					width={150}
					height={80}
					layout="responsive"
				/>
			</div>
			<section className={styles.navSection}>
				{links.map((link) => {
					return (
						<Link
							key={link.name}
							href={link.href}
							className={`${styles.button} ${
								pathname == link.href
									? styles.buttonActive
									: null
							}`}
						>
							<p>{link.name}</p>&nbsp;&nbsp;
							{link.icon || null}
						</Link>
					);
				})}
			</section>
		</header>
	);
}

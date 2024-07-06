"use client";
import { Loader } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push("/dashboard/business");
	}, [router]);

	return <Loader />;
}

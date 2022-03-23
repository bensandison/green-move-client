import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";

export default function Home() {
	useEffect(() => {
		Router.push("/city/bath");
	});
	return (
		<Head>
			<title>GreenMove</title>
			<meta name="description" content="GreenMove..." />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}

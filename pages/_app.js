function MyApp({ Component, pageProps }) {
	return (
		<>
			<nav>
				<h1>nav here</h1>
			</nav>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;

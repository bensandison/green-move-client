/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CityData() {
	const [cityData, setCityData] = useState();

	// Call api with city name when router is ready:
	const router = useRouter();
	useEffect(() => {
		if (!router.isReady) return;

		// Get data
		getData();
	}, [router.isReady]);

	function getData() {
		// TODO: Call api...

		const { cityName } = router.query;
		setCityData({ name: cityName });
	}

	// If no city data:
	if (!cityData) return <p>loading...</p>;
	return <div>place: {cityData.name}</div>;
}

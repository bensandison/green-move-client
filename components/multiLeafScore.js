import SingleLeafScore from "./singleLeafScore";
import { Box, Stack } from "@chakra-ui/react";
import Image from "next/image";
import DetailLeaf from "../public/detail-leaf.svg";

export default function MultiLeafScore({ score }) {
	const fullLeaves = Math.floor(score);
	const decimal = score % 1;

	return (
		<>
			{Array(fullLeaves).fill(
				<Box>
					<Image src={DetailLeaf} alt="detailed leaf emoji" />
				</Box>
			)}
			<SingleLeafScore decimal={decimal}></SingleLeafScore>
		</>
	);
}

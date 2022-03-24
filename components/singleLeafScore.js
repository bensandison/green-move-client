import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import Image from "next/image";
import BlankLeaf from "../public/blank-leaf.svg";
import DetailLeaf from "../public/detail-leaf.svg";

export default function SingleLeafScore({ percent }) {
	return (
		<Grid templateColumns="1fr" templateRows="1fr">
			<GridItem gridColumn="1" gridRow="1">
				<Image src={BlankLeaf} alt="blank leaf image"></Image>
			</GridItem>
			<GridItem gridColumn="1" gridRow="1">
				<Image src={DetailLeaf} alt="detail leaf image"></Image>
			</GridItem>
		</Grid>
	);
}

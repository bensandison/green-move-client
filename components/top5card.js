import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const detailLeafSVG = (
	<svg
		height="28"
		viewBox="0 0 44 56"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M33.7937 45.6716C41.5353 37.93 52.3033 20.1519 33.6854 -3.18806e-05C31.4941 11.3912 17.0007 13.3954 9.26064 21.1385C1.51752 28.8801 -0.233073 39.6821 7.5085 47.4252C15.2501 55.1668 26.0506 53.4147 33.7937 45.6716Z"
			fill="#A6D388"
		/>
		<path
			d="M35.7422 17.3977C38.2691 7.92103 34.6009 0.915575 33.9545 0.269156C33.9545 0.269156 36.6624 6.12404 31.6719 16.2889C29.7976 14.8167 27.1733 10.3289 27.1733 10.3289C26.6382 11.1841 26.8253 16.6353 29.3832 20.3577C28.2496 22.1485 26.8825 24.0444 25.2464 26.0378L23.8994 24.7388C18.6662 19.7128 19.9034 14.0002 19.9034 14.0002C18.9554 14.9868 14.582 22.6588 20.9859 28.8199L21.9725 29.7679C21.3555 30.4267 20.7168 31.0916 20.0395 31.769L17.1785 34.6299L15.5315 32.9845C10.3973 27.8487 10.1947 20.2633 10.1947 20.2633C9.22506 21.2314 6.09812 30.8767 12.3783 37.1569L13.5149 38.295L0.688605 51.1183C-0.281025 52.0864 -0.20061 53.7349 0.765928 54.7014C1.73401 55.6695 3.38099 55.7484 4.34908 54.7803L17.1739 41.9555L17.2651 42.0468C23.5468 48.3269 33.7102 45.7196 34.6798 44.75C34.6798 44.75 26.5733 44.0262 21.439 38.8904L20.839 38.292L26.2547 32.8778C26.3428 32.7897 26.4186 32.703 26.5068 32.6149C33.9251 36.3651 42.4971 30.7143 43.1838 29.5869C43.1838 29.5869 35.8798 31.8525 29.8301 28.8446C31.6781 26.4847 33.0699 24.1743 34.0906 21.9521C38.7191 21.8237 42.9054 17.7658 43.2626 16.7807C43.2626 16.7807 38.6186 18.1895 36.3237 17.6065L35.7422 17.3977Z"
			fill="#77B255"
		/>
	</svg>
);

export default function Top5Card({ num, title, value }) {
	const router = useRouter();

	return (
		<Box
			as="button"
			onClick={(e) => {
				e.preventDefault();
				router.push(`/city/${encodeURIComponent(title.toLowerCase())}`);
			}}
			pos="relative"
			borderWidth={2}
			borderRadius="md"
			p={3}
			_hover={{ boxShadow: "outline" }}
			_focusWithin={{ boxShadow: "outline" }}
		>
			<Box
				borderRadius="4xl"
				lineHeight={1}
				background="white"
				pos="absolute"
				left={-2.5}
				top={-2.5}
			>
				<Text fontSize="4xl" fontWeight="bold">
					{num}
				</Text>
			</Box>
			<Text
				ml={1}
				textAlign="left"
				fontSize="lg"
				fontWeight="semibold"
				noOfLines={1}
			>
				{title}
			</Text>
			<Flex direction="row" alignItems="center">
				<Box>{detailLeafSVG}</Box>
				<Text ml={1} textAlign="left" fontSize="3xl" fontWeight="semibold">
					{value}
				</Text>
			</Flex>
		</Box>
	);
}

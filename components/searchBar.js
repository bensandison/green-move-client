import { InputGroup, InputRightElement, Input, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function SearchBar(props) {
	const [searchQuery, setSearchQuery] = useState("");

	function handleSearchSubmit(e) {
		e.preventDefault();
		console.log("sdfhsfdgu");

		if (searchQuery.replace(/\s/g, "") !== "") {
			console.log("hellooo");
		}
	}

	return (
		<InputGroup size="lg">
			<Input
				variant="outline"
				placeholder={props.value}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<InputRightElement>
				<Button
					onClick={() => {
						handleSearchSubmit;
					}}
				>
					<SearchIcon />
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}

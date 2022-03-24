import {
	InputGroup,
	InputRightElement,
	Input,
	IconButton,
	Form,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Router from "next/router";

export default function SearchBar(props) {
	const [searchQuery, setSearchQuery] = useState("");

	function handleSearchSubmit(e) {
		e.preventDefault();

		// Check search bar has text inside
		if (searchQuery.replace(/\s/g, "") !== "") {
			Router.push(`/city/${searchQuery}`);
		}
	}

	return (
		<InputGroup as="form" size="lg" onSubmit={handleSearchSubmit}>
			<Input
				variant="outline"
				placeholder={props.value}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<InputRightElement>
				<IconButton icon={<SearchIcon />} type="submit"></IconButton>
			</InputRightElement>
		</InputGroup>
	);
}

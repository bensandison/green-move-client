import {
	InputGroup,
	InputRightElement,
	Input,
	IconButton,
	Form,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar(props) {
	const router = useRouter();

	const [searchQuery, setSearchQuery] = useState("");

	function handleSearchSubmit(e) {
		e.preventDefault();
		// Check search bar has text inside
		if (searchQuery.replace(/\s/g, "") !== "") {
			// Send user to route of new city:
			router.push(`/city/${searchQuery}`);
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
				<IconButton
					variant="ghost"
					icon={<SearchIcon />}
					type="submit"
				></IconButton>
			</InputRightElement>
		</InputGroup>
	);
}

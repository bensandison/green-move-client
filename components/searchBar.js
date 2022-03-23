import { InputGroup, InputRightElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar(props) {
	return (
		<InputGroup size="lg">
			<InputRightElement pointerEvents="none">
				<SearchIcon />
			</InputRightElement>
			<Input type="" placeholder="City Name" defaultValue={props.value} />
		</InputGroup>
	);
}

import { useState, useEffect } from 'react';
import { Box, Text, Tooltip } from "@chakra-ui/react";

export default function QualityCard({ title, value, percent }) {
	// https://gist.github.com/roydejong/fb021a973160fa3d04d7aaca675a46cf
	const is_touch_device = () => {
			try {
					let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

					let mq = function (query) {
							return window.matchMedia(query).matches;
					};

					if (('ontouchstart' in window) || (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)) {
							return true;
					}

					return mq(['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(''));
			} catch (e) {
					console.error('(Touch detect failed)', e);
					return false;
			}
	}

	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		setIsTouchDevice(is_touch_device());
	}, []);

	// const roundedPercent = Math.ceil(percent / 5) * 5;

	let barColour = "green";
	if (percent < 75) barColour = "orange";
	if (percent <= 25) barColour = "red";

	return (
		<Box display="flex" flexDir="column" justifyContent="space-between" borderWidth={2} borderRadius="md" p={3}>
			<Box>
				<Text fontSize="lg" fontWeight="semibold" mb={1}>
					{title}
				</Text>
			</Box>
			<Box>
				<Text fontSize="2xl" fontWeight="semibold" mb={2} display={isTouchDevice ? 'block' : ['block', 'block', 'none']}>
					{value}
				</Text>
				{ percent !== undefined &&
					<Tooltip label={value} aria-label={value} isDisabled={isTouchDevice}>
						<Box py={[1, 1, 2]}>
							<Box background="#eee" height="2" borderRadius="xl" width="100%">
								<Box
									background={barColour}
									height="2"
									borderRadius="xl"
									width={percent + "%"}
								></Box>
							</Box>
						</Box>
					</Tooltip>
				}
			</Box>
		</Box>
	);
}

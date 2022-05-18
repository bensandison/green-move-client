import { Box, Text, Image } from "@chakra-ui/react";

export default function Property({
  location,
  summary,
  bedrooms,
  bathrooms,
  price,
  imageSrc,
}) {
  return (
    <Box borderWidth={2} borderRadius="md" p={3}>
      <Image src={imageSrc} alt="image of property" />
      <Text fontSize="lg" fontWeight="semibold">
        {location}
      </Text>
      <Text fontSize="lg" fontWeight="semibold">
        £{price}
      </Text>
      <Text fontSize="sm" fontWeight="semibold">
        {summary}
      </Text>
      <Text fontSize="sm" fontWeight="semibold">
        bedrooms: {bedrooms} bathrooms: {bathrooms}
      </Text>
    </Box>
  );
}

import { Box, Text, Image, Flex, AspectRatio, Badge } from "@chakra-ui/react";

export default function Property({
  location,
  summary,
  bedrooms,
  bathrooms,
  price,
  imageSrc,
  propertyType,
}) {
  return (
    <Box borderWidth={2} borderRadius="md" p={0}>
      <AspectRatio ratio={14 / 9}>
        <Image
          borderTopRadius="md"
          src={imageSrc}
          alt="image of property"
          objectFit="cover"
        />
      </AspectRatio>
      <Box p={3}>
        <Flex alignItems="center" gap="10px" flexWrap="wrap">
          <Badge colorScheme="green">{propertyType}</Badge>
          <Flex gap="10px" alignItems="center">
            <Image src="/bedroom-icon.svg" height="20px"></Image>
            <Text fontSize="sm" fontWeight="semibold">
              {bedrooms}
            </Text>
            <Image src="/bathrooms-icon.svg" height="20px"></Image>
            <Text fontSize="sm" fontWeight="semibold">
              {bathrooms}
            </Text>
          </Flex>
        </Flex>

        <Text fontSize="md" fontWeight="semibold" noOfLines={2}>
          {summary}
        </Text>

        <Text fontSize="sm" noOfLines={3}>
          £{price.toLocaleString("en-US")}
        </Text>
      </Box>
    </Box>
  );
}

import { Heading, Text, VStack, useMediaQuery } from "@chakra-ui/react";

type InfoProps = {
	title: string;
	info: string[];
};

export const InfoItem = ({ title, info }: InfoProps) => {
	const [isLowerThan650] = useMediaQuery("(max-width: 650px)");

	return (
		<VStack
			flexBasis={!isLowerThan650 ? "20%" : "auto"}
			alignItems={"flex-start"}
			justifyContent={"flex-start"}
		>
			<Heading textTransform="uppercase" color="gray" fontSize="12px">
				{title}
			</Heading>
			<Text fontSize="16px" fontWeight={"700"}>
				{info.length > 1 ? info.join(", ") : info[0]}
			</Text>
		</VStack>
	);
};

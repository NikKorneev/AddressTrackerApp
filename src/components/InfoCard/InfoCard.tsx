import { HStack, Spinner, StackDivider, useMediaQuery } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { useGetLocationQuery } from "../../store/api";
import { InfoItem } from "../InfoItem/InfoItem";

function InfoCard() {
	const { value: sliceValue } = useAppSelector((state) => state.slice);
	const { data, isFetching } = useGetLocationQuery(sliceValue);
	const [isLowerThan650] = useMediaQuery("(max-width: 650px)");

	const usedData = {
		country: data?.location?.country || "",
		region: data?.location?.region || "",
		city: data?.location?.city || "",
		ip: data?.ip || "",
		timezone: data?.location?.timezone || "",
		name: data?.as?.name || "",
	};

	if (isFetching)
		return (
			<HStack
				left={!isLowerThan650 ? "50%" : "initial"}
				transform={
					!isLowerThan650 ? "translate3d(-50%, 2vw, 0)" : "initial"
				}
				zIndex={"1000"}
				divider={
					!isLowerThan650 ? (
						<StackDivider borderColor="gray.200" />
					) : undefined
				}
				maxWidth={"1440px"}
				position={!isLowerThan650 ? "absolute" : "static"}
				backgroundColor={"#FFFF"}
				justifyContent={!isLowerThan650 ? "center" : "flex-start"}
				alignItems={"flex-start"}
				gap={"20px"}
				borderRadius={"20px"}
				padding={!isLowerThan650 ? "40px" : "35px 20px"}
				flexWrap={isLowerThan650 ? "wrap" : "nowrap"}
				margin={!isLowerThan650 ? "0 auto" : "20px auto 0 auto"}
				width={!isLowerThan650 ? "clamp(650px, 70vw, 1440px)" : "95%"}
			>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			</HStack>
		);

	return (
		<HStack
			left={!isLowerThan650 ? "50%" : "initial"}
			transform={
				!isLowerThan650 ? "translate3d(-50%, 2vw, 0)" : "initial"
			}
			zIndex={"1000"}
			divider={
				!isLowerThan650 ? (
					<StackDivider borderColor="gray.200" />
				) : undefined
			}
			maxWidth={"1440px"}
			position={!isLowerThan650 ? "absolute" : "static"}
			backgroundColor={"#FFFF"}
			justifyContent={!isLowerThan650 ? "center" : "flex-start"}
			alignItems={"flex-start"}
			gap={"20px"}
			borderRadius={"20px"}
			padding={!isLowerThan650 ? "40px" : "35px 20px"}
			flexWrap={isLowerThan650 ? "wrap" : "nowrap"}
			margin={!isLowerThan650 ? "0 auto" : "20px auto 0 auto"}
			width={!isLowerThan650 ? "clamp(650px, 70vw, 1440px)" : "95%"}
		>
			{usedData.ip.length > 1 ? (
				<InfoItem title="ip address" info={[usedData.ip]} />
			) : null}
			{usedData.country.length > 1 ||
			usedData.region.length > 1 ||
			usedData.city.length > 1 ? (
				<InfoItem
					title="location"
					info={[usedData.city, usedData.country, usedData.region]}
				/>
			) : null}

			{usedData.timezone.length > 1 ? (
				<InfoItem
					title="timezone"
					info={["UTC " + usedData.timezone]}
				/>
			) : null}
			{usedData.name.length > 1 ? (
				<InfoItem title="name" info={[usedData.name]} />
			) : null}
		</HStack>
	);
}

export { InfoCard };

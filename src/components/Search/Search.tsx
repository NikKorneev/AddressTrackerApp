import {
	IconButton,
	Input,
	HStack,
	useMediaQuery,
	useToast,
} from "@chakra-ui/react";
import ArrowBtn from "../../assets/icon-arrow.svg?react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setValue } from "../../store/slice";
import styled from "styled-components";
import { useGetLocationQuery } from "../../store/api";

const MyH1 = styled.h1`
	text-align: center;
	color: #ffffff;
	font-size: 30px;
	font-weight: bold;
	padding-top: 20px;
	padding-bottom: 20px;
`;

type MyError = {
	data: { code: number; messages: string };
	status: number;
};

export const Search = () => {
	const [value, setInputValue] = useState("");
	const { value: sliceValue } = useAppSelector((state) => state.slice);
	const { isError, isFetching, error } = useGetLocationQuery(sliceValue);
	const [isLowerThan650] = useMediaQuery("(max-width: 650px)");
	const toast = useToast();

	const dispatch = useAppDispatch();

	const clickHandler = () => {
		if (value && value.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/)) {
			dispatch(setValue(`&ipAddress=${value}`));
		} else if (value) {
			dispatch(setValue(`&domain=${value}`));
		}
	};

	return (
		<div>
			<MyH1>IP Address Tracker</MyH1>
			{isError
				? toast({
						title: `Возникла ошибка`,
						description: (error as MyError).data.messages.includes(
							"correct"
						)
							? "Введите корректный ip или домен"
							: "Возникла ошибка",
						status: "error",
						duration: 9000,
						isClosable: true,
				  })
				: null}

			<HStack spacing={"0px"} justifyContent={"center"}>
				<Input
					borderColor={isError ? "red" : "white"}
					focusBorderColor={isError ? "red" : "blue"}
					placeholder="Search for any IP address or domain IP Address"
					background="#FFF"
					height={"50px"}
					value={value}
					required={true}
					borderRadius={"12px 0px 0px 12px"}
					maxWidth={!isLowerThan650 ? "30%" : "85%"}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<IconButton
					icon={<ArrowBtn />}
					bg="black"
					aria-label="Search the address"
					size="lg"
					borderRadius={"0px 12px 12px 0px"}
					height={"50px"}
					onClick={clickHandler}
					isLoading={isFetching}
				/>
			</HStack>
		</div>
	);
};

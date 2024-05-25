import { Search, Map } from "./components";
import { Container } from "@chakra-ui/react";
import "./index.css";
import backUrl from "./assets/pattern-bg-desktop.png";
import { InfoCard } from "./components/InfoCard/InfoCard";

function App() {
	return (
		<Container
			maxW="100%"
			backgroundImage={backUrl}
			padding={"0"}
			backgroundPosition={"center"}
			backgroundRepeat={"no-repeat"}
			backgroundSize={"cover"}
			height={"100vh"}
			alignItems={"center"}
			alignContent={"center"}
		>
			<Search></Search>
			<InfoCard />
			<Map></Map>
		</Container>
	);
}

export default App;

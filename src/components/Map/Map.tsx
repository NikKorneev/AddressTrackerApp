import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { LocationFetched, useGetLocationQuery } from "../../store/api";
import { useAppDispatch, useAppSelector } from "../../store";
import { useMediaQuery } from "@chakra-ui/react";
import { setValue } from "../../store/slice";

const MapWrapper = styled.div`
	margin: 20px auto 0 auto;
	max-width: 100%;
	margin-top: 6vw;
    `;

const LocationMark = () => {
	type Location = Pick<LocationFetched["location"], "lat" | "lng">;
	const [position, setPosition] = useState<LatLng | null | Location>(null);
	const { value } = useAppSelector((state) => state.slice);
	const { data } = useGetLocationQuery(value);
	const dispatch = useAppDispatch();

	const map = useMapEvents({
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
		click(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
		keyup(e) {
			if (e.originalEvent.key === "s") {
				map.locate();
			}
		},
	});

	useEffect(() => {
		if (data?.location.lat && data?.location.lng && value) {
			map.flyTo(
				{ lat: data?.location.lat, lng: data?.location.lng },
				map.getZoom()
			);
			setPosition({ lat: data?.location.lat, lng: data?.location.lng });
		} else {
			map.whenReady(() => {
				map.locate();
			});
		}
		// dispatch(setError(isError));
	}, [data, value]);

	useEffect(() => {
		dispatch(setValue(""));
	}, []);

	return position === null ? null : (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
	);
};

export const Map = () => {
	const [isLowerThan650] = useMediaQuery("(max-width: 650px)");
	const height = !isLowerThan650 ? "80vh" : "600px";

	return (
		<MapWrapper>
			<MapContainer
				center={{ lat: 51.505, lng: -0.09 }}
				zoom={13}
				scrollWheelZoom={false}
				style={{
					height: height,
					width: "100%",
				}}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LocationMark />
			</MapContainer>
		</MapWrapper>
	);
};

import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Loader } from "@googlemaps/js-api-loader"

const Map = styled.div`
	height: 19rem;
	width: 100%;
`

const GoogleMap = (props) => {
	const { pickupInput, dropoffInput } = props 
	let map: google.maps.Map;
	let directionsService: google.maps.DirectionsService;
	let directionsRenderer: google.maps.DirectionsRenderer;
	let travelMode: google.maps.TravelMode;
	let originPlaceID: string = "";
	let destinationPlaceID: string = "";

	const route = () => {
		if (!originPlaceID || !destinationPlaceID) {
			// const marker = new google.maps.Marker({
			// 	map,
			// 	anchorPoint: new google.maps.Point(0, -29),
			// });
			// marker.setPosition(place.geometry.location);
			return;
		}

		directionsService.route(
		{
			origin: { placeId: originPlaceID },
			destination: { placeId: destinationPlaceID },
			travelMode: travelMode,
		},
		(response, status) => {
			if (status === "OK") {
				console.log("!!!")
				directionsRenderer.setDirections(response);
			} else {
				window.alert("Directions request failed due to " + status);
			}
		}
		);
	}

	const setupPlaceChangedListener = (
		autocomplete: google.maps.places.Autocomplete,
		mode: string
	) => {
		autocomplete.bindTo("bounds", map);

		autocomplete.addListener("place_changed", () => {
		const place = autocomplete.getPlace();

		if (!place.place_id) {
			window.alert("Please select an option from the dropdown list.");
			return;
		}

		if (mode === "ORIG") {
			originPlaceID = place.place_id
		} else {
			destinationPlaceID = place.place_id
		}
		route();
		});
	}

	useEffect(() => {
		// Configuration (instead of script tag, this loader is more compatiable with React) 
		const loader = new Loader({
			apiKey: "AIzaSyBgAfMFqGXkbbWSqmebn95UOGnjb5w-rso",
			version: "weekly",
			libraries: ["places"] // add other services here
		});

		loader.load().then(() => {
			// Initialize Map and display in div which has id #map
			map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
				center: { lat: -34.397, lng: 150.644 },
				zoom: 8,
			});
			
			travelMode = google.maps.TravelMode.DRIVING;
			directionsService = new google.maps.DirectionsService();
			directionsRenderer = new google.maps.DirectionsRenderer();
			directionsRenderer.setMap(map);
			if (pickupInput && dropoffInput) {
				const originInput = pickupInput;
				const destinationInput = dropoffInput;
				const originAutocomplete = new google.maps.places.Autocomplete(originInput);
				originAutocomplete.setFields(["place_id"]);
				const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
				destinationAutocomplete.setFields(["place_id"]);
				setupPlaceChangedListener(originAutocomplete, "ORIG");
				setupPlaceChangedListener(destinationAutocomplete, "DEST");
			}
		})
	}, [pickupInput])

	return (
		<>
			<Map id="map">

			</Map>
		</>
	)
}

export default GoogleMap
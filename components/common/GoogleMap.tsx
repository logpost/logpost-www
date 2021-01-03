import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Loader } from "@googlemaps/js-api-loader"
import { extractAddress } from '../utilities/helper'
import { route } from '../utilities/googlemaps'

interface MapInterface {
	originInput: HTMLInputElement, 
	dropoffInput: HTMLInputElement, 
	setAddress: (value: Object) => void, 
	setDistance: (value: number) => void,
	setPlace: (value: Object) => void
	submitButton: HTMLButtonElement
}

const Map = styled.div`
	height: 30rem;
	width: 100%;
`

const GoogleMap = (props: MapInterface) => {
	const { originInput, dropoffInput, setAddress, setDistance, setPlace, submitButton } = props 
	let map: google.maps.Map;
	let directionsService: google.maps.DirectionsService;
	let directionsRenderer: google.maps.DirectionsRenderer;
	let travelMode: google.maps.TravelMode;
	let originPlace: google.maps.LatLng;
	let destinationPlace: google.maps.LatLng;
	let currentPlace: google.maps.places.PlaceResult | google.maps.GeocoderResult

	const setupPlaceChangedListener = (
		autocomplete: google.maps.places.Autocomplete,
		mode: string
	) => {
		autocomplete.bindTo("bounds", map);

		autocomplete.addListener("place_changed", () => {
		const place = autocomplete.getPlace();

		if (!place.geometry.location) {
			window.alert("Please select an option from the dropdown list.");
			return;
		}

		const extractedAddress = extractAddress(place.address_components)
		console.log(place)
		if (mode === "ORIG") {
			originPlace = place.geometry.location
			currentPlace = place
			// setAddress({
			// 	latitude: place.geometry.location.lat(),
			// 	longtitude: place.geometry.location.lng(),
			// 	address: extractedAddress.address,  
			// 	province: extractedAddress.province,
			// 	district: extractedAddress.district,
			// 	zipcode: extractedAddress.zipcode,	
			// })
		} else {
			destinationPlace = place.geometry.location
			// setDropoffLatLng({
			// 	latitude: place.geometry.location.lat(),
			// 	longtitude: place.geometry.location.lng(),
			// 	address: extractedAddress.address,  
			// 	province: extractedAddress.province,
			// 	district: extractedAddress.district,
			// 	zipcode: extractedAddress.zipcode,	
			// })
		}
		route(originPlace, destinationPlace, directionsService, directionsRenderer, travelMode, setDistance);
		});
	}

	useEffect(() => {
		// Configuration (instead of script tag, this loader is more compatiable with React) 
		const loader = new Loader({
			apiKey: "AIzaSyBgAfMFqGXkbbWSqmebn95UOGnjb5w-rso",
			version: "weekly",
			libraries: ["places"], // add other services here
			language: "th"
		});

		loader.load().then(() => {
			// Initialize Map and display in div which has id #map
			const bangkokLatLng = { lat: 13.7563, lng: 100.5018 }
			let originAutocomplete: google.maps.places.Autocomplete;
			map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
				center: bangkokLatLng,
				zoom: 8,
			});

			if (originInput) {
				originAutocomplete = new google.maps.places.Autocomplete(originInput);
				originAutocomplete.setFields(["geometry", "address_components", "formatted_address"]);
				setupPlaceChangedListener(originAutocomplete, "ORIG");

				originAutocomplete.addListener("place_changed", () => {
				const place = originAutocomplete.getPlace();
					if (place.geometry.viewport) {
						map.fitBounds(place.geometry.viewport);
					} else {
						map.setCenter(place.geometry.location);
					}
					marker.setPosition(place.geometry.location);
				})
			}

			var marker = new google.maps.Marker({
				position: bangkokLatLng,
				map: map,
            });

			google.maps.event.addListener(map, 'center_changed', function() {
				var center = map.getCenter();
				marker.setPosition(center);
				const geocoder = new google.maps.Geocoder();
				geocoder.geocode(
					{ location: marker.getPosition() },
					(
						results: google.maps.GeocoderResult[],
						status: google.maps.GeocoderStatus
					) => {
						if (status === "OK") {
							// const extractedAddress = extractAddress(results[0].address_components)
							currentPlace = results[0]
							// setAddress({
							// 	latitude: marker.getPosition().lat(),
							// 	longtitude: marker.getPosition().lng(),
							// 	address: extractedAddress.address,  
							// 	province: extractedAddress.province,
							// 	district: extractedAddress.district,
							// 	zipcode: extractedAddress.zipcode,	
							// })
							originInput.value = results[0].formatted_address
							// console.log(results[0])
						}
					}
				)
            });

			if (submitButton) {
				console.log("???")
				submitButton.addEventListener("click", () => {
					setPlace(currentPlace);
				});
			}

			// travelMode = google.maps.TravelMode.DRIVING;
			// directionsService = new google.maps.DirectionsService();
			// directionsRenderer = new google.maps.DirectionsRenderer();
			// directionsRenderer.setMap(map);
			// if (pickupInput && dropoffInput) {
			// 	const originInput = pickupInput;
			// 	const destinationInput = dropoffInput;
			// 	const originAutocomplete = new google.maps.places.Autocomplete(originInput);
			// 	originAutocomplete.setFields(["geometry", "address_components"]);
			// 	const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
			// 	destinationAutocomplete.setFields(["geometry", "address_components"]);
			// 	setupPlaceChangedListener(originAutocomplete, "ORIG");
			// 	setupPlaceChangedListener(destinationAutocomplete, "DEST");
			// }
		})
	}, [originInput, dropoffInput])

	return (
		<>
			<Map id="map">

			</Map>
		</>
	)
}

export default GoogleMap
import React, { useEffect, useRef, useState } from 'react'

import { Loader } from "@googlemaps/js-api-loader"
import styled from "styled-components"

interface MapInterface {
	targetMap: HTMLElement
	placeInput: HTMLInputElement
	setPlace: (value: google.maps.places.PlaceResult | google.maps.GeocoderResult) => void
	submitButton: HTMLButtonElement
}

const GoogleMap = (props: MapInterface) => {
	const { targetMap, placeInput, setPlace, submitButton } = props 
	const [isPlaceChanged, setIsPlaceChanged] = useState(false);
	const isPlaceChangedRef = useRef(null)
	// const [currentPlace, setCurrentPlace] = useState()
	let map: google.maps.Map;
	let directionsService: google.maps.DirectionsService;
	let directionsRenderer: google.maps.DirectionsRenderer;
	let travelMode: google.maps.TravelMode;
	let currentPlace: google.maps.places.PlaceResult | google.maps.GeocoderResult
	let marker: google.maps.Marker

	useEffect(() => {
    	isPlaceChangedRef.current = isPlaceChanged;
  	});
	
	const setupPlaceChangedListener = (
		autocomplete: google.maps.places.Autocomplete,
	) => {
		autocomplete.addListener("place_changed", () => {
			setIsPlaceChanged(true)
			const place = autocomplete.getPlace();
			if (!place.geometry) {
				return;
			}
			currentPlace = place
			if (place.geometry) {
				if (place.geometry.viewport) {
					map.fitBounds(place.geometry.viewport);
				} else {
					map.setCenter(place.geometry.location);
				}
				marker.setPosition(place.geometry.location);
			}
		})
	}

	const setupCenterChangedListener = () => {
		google.maps.event.addListener(map, 'center_changed', () => {
			let center = map.getCenter();
			marker.setPosition(center);
			const geocoder = new google.maps.Geocoder();
			geocoder.geocode(
				{ location: marker.getPosition() },
				(
					results: google.maps.GeocoderResult[],
					status: google.maps.GeocoderStatus
				) => {
					if (status === "OK") {
						currentPlace = results[0]
						if (!isPlaceChangedRef.current) {
							placeInput.value = results[0].formatted_address
						} else {
							setIsPlaceChanged(false)
						}
					}
				}
			)
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
			if (targetMap) {
				map = new google.maps.Map(targetMap, {
					center: bangkokLatLng,
					zoom: 8,
				});
			}

			marker = new google.maps.Marker({
				position: bangkokLatLng,
				map: map,
            });

			if (placeInput) {
				const originAutocomplete = new google.maps.places.Autocomplete(placeInput);
				originAutocomplete.setFields(["geometry", "address_components", "formatted_address"]);
				setupPlaceChangedListener(originAutocomplete);
				setupCenterChangedListener();
			}

			if (submitButton) {
				submitButton.addEventListener("click", () => {
					setPlace(currentPlace);
				});
			}

			// travelMode = google.maps.TravelMode.DRIVING;
			// directionsService = new google.maps.DirectionsService();
			// directionsRenderer = new google.maps.DirectionsRenderer();
			// directionsRenderer.setMap(map);
		})
	}, [targetMap])

	return null
}

export default GoogleMap
import { Loader } from "@googlemaps/js-api-loader"
import { MapInterface } from "../../entities/interface/googlemaps"
const loader = new Loader({
	apiKey: "AIzaSyBgAfMFqGXkbbWSqmebn95UOGnjb5w-rso",
	version: "weekly",
	libraries: ["places"],
	language: "th"
});

export const initMap = (targetMap: HTMLElement, setMap:(mapProperty: MapInterface) => void):void => {
	loader.load().then(() => {
		const bangkokLatLng = { lat: 13.7563, lng: 100.5018 }
		if (targetMap) {
			const map = new google.maps.Map(targetMap, {
				center: bangkokLatLng,
				zoom: 8,
				streetViewControl: false,
			});
			setMap({
				map: map,
				directionsService: new google.maps.DirectionsService(),
				directionsRenderer: new google.maps.DirectionsRenderer()
			})
		}
	})
}

export const route = (
	originPlace: google.maps.LatLng, 
	destinationPlace:  google.maps.LatLng,
	map: MapInterface,
	setDistance: (distance: number) => void
	): void => {
	loader.load().then(() => {
		const travelMode = google.maps.TravelMode.DRIVING;
		const directionsService = map.directionsService;
		const directionsRenderer = map.directionsRenderer;
		directionsRenderer.setMap(map.map);

		if (!originPlace || !destinationPlace) {
			return;
		}
		directionsService.route(
			{
				origin: originPlace,
				destination: destinationPlace,
				travelMode: travelMode,
			},
			(response, status) => {
				if (status === "OK") {
					directionsRenderer.setDirections(response);
					const distance = (response.routes[0].legs[0].distance.value)/1000
					setDistance(distance)
				} else {
					window.alert("Directions request failed due to " + status);
				}
			}
		);
	})
}

export const selectPositionOnMap = (
	targetMap: HTMLElement, 
	placeInput: HTMLInputElement, 
	setPlace: (place: google.maps.places.PlaceResult | google.maps.GeocoderResult) => void, 
	submitButton: HTMLButtonElement) => {
	let map: google.maps.Map;
	let currentPlace: google.maps.places.PlaceResult | google.maps.GeocoderResult
	let marker: google.maps.Marker
	let isPlaceChanged = false

	const setupPlaceChangedListener = (
		autocomplete: google.maps.places.Autocomplete,
	) => {
		autocomplete.addListener("place_changed", () => {
			isPlaceChanged = true
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
			window.setTimeout(function() {
				let center = map.getCenter();
				marker.setPosition(center);
			}, 100);
			const geocoder = new google.maps.Geocoder();
			geocoder.geocode(
				{ location: marker.getPosition() },
				(
					results: google.maps.GeocoderResult[],
					status: google.maps.GeocoderStatus
				) => {
					if (status === "OK") {
						currentPlace = results[0]
						if (!isPlaceChanged) {
							placeInput.value = results[0].formatted_address
						} else {
							isPlaceChanged = false
						}
					}
				}
			)
		});
	}

	loader.load().then(() => {
		const bangkokLatLng = { lat: 13.7563, lng: 100.5018 }
		if (targetMap) {
			map = new google.maps.Map(targetMap, {
				center: bangkokLatLng,
				zoom: 8,
				streetViewControl: false,
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
				setPlace(currentPlace)
			});
		}
	})
}
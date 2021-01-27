import { Loader } from "@googlemaps/js-api-loader";
import {
    MapInterface,
    PlaceInterface,
} from "../../entities/interface/googlemaps";
const loader = new Loader({
    apiKey: "AIzaSyBgAfMFqGXkbbWSqmebn95UOGnjb5w-rso",
    version: "weekly",
    libraries: ["places"],
    language: "th",
});

export const initMap = (
    targetMap: HTMLElement,
    setMap: (mapProperty: MapInterface) => void
): void => {
    loader.load().then(() => {
        const bangkokLatLng = { lat: 13.7563, lng: 100.5018 };
        if (targetMap) {
            const map = new google.maps.Map(targetMap, {
                center: bangkokLatLng,
                zoom: 8,
                streetViewControl: false,
            });
            setMap({
                map: map,
                directionsService: new google.maps.DirectionsService(),
                directionsRenderer: new google.maps.DirectionsRenderer(),
            });
        }
    });
};

export interface LatLng {
    latitude: number;
    longitude: number;
}

export const route = (
    originPlace: google.maps.LatLng | LatLng,
    destinationPlace: google.maps.LatLng | LatLng,
    map: MapInterface,
    setRouteDetails?: (distance: number, duration: number) => void
): void => {
    loader.load().then(() => {
        const travelMode = google.maps.TravelMode.DRIVING;
        const directionsService = map.directionsService;
        const directionsRenderer = map.directionsRenderer;
        directionsRenderer.setMap(map.map);

        if (!originPlace || !destinationPlace) {
            return;
        }

        if (
            (originPlace as LatLng).latitude ||
            (destinationPlace as LatLng).latitude
        ) {
            originPlace = new google.maps.LatLng(
                (originPlace as LatLng).latitude,
                (originPlace as LatLng).longitude
            );
            destinationPlace = new google.maps.LatLng(
                (destinationPlace as LatLng).latitude,
                (destinationPlace as LatLng).longitude
            );
        }

        directionsService.route(
            {
                origin: originPlace as google.maps.LatLng,
                destination: destinationPlace as google.maps.LatLng,
                travelMode: travelMode,
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);
                    if (setRouteDetails !== undefined) {
                        const distance =
                            response.routes[0].legs[0].distance.value / 1000;
                        const duration = response.routes[0].legs[0].duration.value; // seconds
                        setRouteDetails(distance, duration);
                    }
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    });
};

// export const getPlaceDetails = (
// 	pickupLatLng: LatLng,
// 	dropoffLatLng: LatLng,
// 	setPlace: (value: PlaceInterface) => void)
// 	:(google.maps.GeocoderResult | void) => {
// 	loader.load().then(() => {
// 		const geocoder = new google.maps.Geocoder();
// 		const result = {
// 			pickup: null,
// 			dropoff: null
// 		}
// 		if (pickupLatLng.lat && pickupLatLng.lng && dropoffLatLng.lat && dropoffLatLng.lng) {
// 			geocoder.geocode(
// 				{ location: new google.maps.LatLng(pickupLatLng.lat, pickupLatLng.lng) },
// 				(
// 					results: google.maps.GeocoderResult[],
// 					status: google.maps.GeocoderStatus
// 				) => {
// 					if (status === "OK") {
// 						result.pickup = results[0]
// 						geocoder.geocode(
// 							{ location: new google.maps.LatLng(dropoffLatLng.lat, dropoffLatLng.lng) },
// 							(
// 								results: google.maps.GeocoderResult[],
// 								status: google.maps.GeocoderStatus
// 							) => {
// 								if (status === "OK") {
// 									result.dropoff = results[0]
// 									setPlace(result)
// 								}
// 							}
// 						)
// 					}
// 				}
// 			)
// 		}
// 	})
// }

export const selectPositionOnMap = (
    targetMap: HTMLElement,
    placeInput: HTMLInputElement,
    setPlace: (
        place: google.maps.places.PlaceResult | google.maps.GeocoderResult
    ) => void,
    position: LatLng,
    submitButton: HTMLButtonElement
) => {
    let map: google.maps.Map;
    let currentPlace:
        | google.maps.places.PlaceResult
        | google.maps.GeocoderResult;
    let marker: google.maps.Marker;
    let isPlaceChanged = false;
    let currentPosition: google.maps.LatLng

    if (
        (position as LatLng).latitude ||
        (position as LatLng).latitude
    ) {
        currentPosition = new google.maps.LatLng(
            (position as LatLng).latitude,
            (position as LatLng).longitude
        );
    }

    const setupPlaceChangedListener = (
        autocomplete: google.maps.places.Autocomplete
    ) => {
        autocomplete.addListener("place_changed", () => {
            isPlaceChanged = true;
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            currentPlace = place;
            if (place.geometry) {
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                }
                marker.setPosition(place.geometry.location);
            }
        });
    };

    const setupCenterChangedListener = () => {
        google.maps.event.addListener(map, "center_changed", () => {
            // window.setTimeout(function() {
            let center = map.getCenter();
            marker.setPosition(center);
            // }, 100);
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
                { location: marker.getPosition() },
                (
                    results: google.maps.GeocoderResult[],
                    status: google.maps.GeocoderStatus
                ) => {
                    if (status === "OK") {
                        if (!isPlaceChanged) {
                            currentPlace = results[0];
                            placeInput.value = results[0].formatted_address;
                        } else {
                            isPlaceChanged = false;
                        }
                    }
                }
            );
        });
    };

    loader.load().then(() => {
        const bangkokLatLng = { lat: 13.7563, lng: 100.5018 };
        if (targetMap) {
            map = new google.maps.Map(targetMap, {
                center: currentPosition || bangkokLatLng,
                zoom: 8,
                streetViewControl: false,
            });
        }

        marker = new google.maps.Marker({
            position: currentPosition || bangkokLatLng,
            map: map,
        });

        if (placeInput) {
            const originAutocomplete = new google.maps.places.Autocomplete(
                placeInput
            );
            originAutocomplete.setFields([
                "geometry",
                "address_components",
                "formatted_address",
            ]);
            setupPlaceChangedListener(originAutocomplete);
            setupCenterChangedListener();
        }

        if (submitButton) {
            submitButton.addEventListener("click", () => {
                if (currentPlace) {
                    setPlace(currentPlace);
                }
            });
        }
    });
};

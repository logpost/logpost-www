export const route = (
	originPlace: google.maps.LatLng, 
	destinationPlace:  google.maps.LatLng,
	directionsService: google.maps.DirectionsService,
	directionsRenderer: google.maps.DirectionsRenderer,
	travelMode: google.maps.TravelMode,
	setDistance: (distance: number) => void
	) => {
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
				console.log("!!!")
				directionsRenderer.setDirections(response);
				setDistance((response.routes[0].legs[0].distance.value)/1000)
			} else {
				window.alert("Directions request failed due to " + status);
			}
		}
	);
}
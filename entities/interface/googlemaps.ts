export interface MapInterface {
	map: google.maps.Map
	directionsService: google.maps.DirectionsService,
	directionsRenderer: google.maps.DirectionsRenderer
}

export interface InitMapInterface {
	targetMap: HTMLElement
	setMap: (mapProperty: MapInterface) => void
}

export interface PlaceInterface {
	pickup: google.maps.places.PlaceResult | google.maps.GeocoderResult
	dropoff: google.maps.places.PlaceResult | google.maps.GeocoderResult
}

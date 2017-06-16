import Promise from 'bluebird';
import _get from 'lodash/get';
export const findLocation = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, {
			timeout: 10 * 1000,
		});
	});
};
export const getReverseGeoCodeDetails = (googleMaps, placeId) => {
	return new Promise((resolve, reject) => {
		const geocoder = new googleMaps.Geocoder();
		geocoder.geocode({
			placeId
		}, (results, status) => {
			if (status === 'OK') {
				resolve(_get(results, '0'));
			}
		});
	});
};
export const getLocationDetails = (googleMaps, placeId, mapNode) => {
	return new Promise((resolve, reject) => {
		const map = new googleMaps.Map(mapNode),
			service = new googleMaps.places.PlacesService(map);
		service.getDetails({
			placeId: placeId
		}, (result, status) => {
			if (status === 'OK') {
				resolve(result)
			}
		});
	});
};

export const findNearByPlaces = ({
	googleMaps,
	location,
	mapNode,
	radius,
	keyword,
	type
}) => {
	return new Promise((resolve, reject) => {
		const map = new googleMaps.Map(mapNode, {
				center: location,
			}),
			service = new googleMaps.places.PlacesService(map);
		service.nearbySearch({
			location,
			radius,
			keyword,
			type
		}, (results, status) => {
			if (status === 'OK') {
				resolve(results)
			}
		});
	});
};
/**
 *
 *
 */
export const findNearyByRestaurants = (googleMaps, placeId, mapNode, keyword = '') => {
	return new Promise((resolve, reject) => {
		getReverseGeoCodeDetails(googleMaps, placeId).then((results) => {
			findNearByPlaces({
				googleMaps,
				location: _get(results, 'geometry.location'),
				mapNode,
				radius: 2000,
				keyword,
				type: ['restaurant']
			}).then((locationResults) => {
				resolve(locationResults.map(result => ({
					...result,
					value: result.place_id,
					label: result.name,
				})));
			});
		})
	});
};
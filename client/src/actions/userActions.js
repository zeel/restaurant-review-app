export const GET_USER_LOCATION = 'GET_USER_LOCATION';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';

export const getUserLocation = () => ({
	type: GET_USER_LOCATION,
});

/**
 * 
 * 
 * @param {any} position 
 */
export const setUserLocation = position => ({
	type: SET_USER_LOCATION,
	payload: {
		coords: position.coords,
	},
});
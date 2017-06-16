import ajax from '../utils/ajax';
export default {
	create(review) {
			return ajax.post('/review', review);
		},
		get(placeId) {
			return ajax.get(`/review/${placeId}`);
		},
		update(reviewId, review) {
			return ajax.put(`/review/${reviewId}`, review);
		},
		delete(reviewId) {
			return ajax.delete(`/review/${reviewId}`);
		},
};
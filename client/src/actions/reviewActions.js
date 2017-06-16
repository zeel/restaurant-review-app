export const REVIEW_FETCHED_REQUESTED = 'REVIEW_FETCHED_REQUESTED';
export const REVIEW_FETCHED_SUCCEEDED = 'REVIEW_FETCHED_SUCCEEDED';
export const REVIEW_FETCHED_FAILED = 'REVIEW_FETCHED_FAILED';
export const REVIEW_CREATE_REQUESTED = 'REVIEW_CREATE_REQUESTED';
export const REVIEW_CREATE_SUCCEEDED = 'REVIEW_CREATE_SUCCEEDED';
export const REVIEW_CREATE_FAILED = 'CREATE_REVIEW_FAILED';

export const fetchReviews = placeId => ({
	type: REVIEW_FETCHED_REQUESTED,
	payload: {
		placeId
	}
});

export const createReview = review => ({
	type: REVIEW_CREATE_REQUESTED,
	payload: {
		review
	}
});

export const fetchedReviews = reviews => ({
	type: REVIEW_FETCHED_SUCCEEDED,
	payload: {
		reviews
	},
});

export const createdReview = review => ({
	type: REVIEW_CREATE_SUCCEEDED,
	payload: {
		review
	},
});
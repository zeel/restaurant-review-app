import {
	Router
} from 'express';

const router = new Router();

import ReviewController from '../controllers/reviewController';

const controller = new ReviewController();

export default function(router) {
	router.post('/review', controller.create);
	router.get('/review/:placeId', controller.list);
	router.delete('/review/:id', controller.delete);
	router.put('/review/:id', controller.edit);
	return router;
}
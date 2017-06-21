import request from 'superagent';
import Review from '../models/review';
class ReviewController {
	list(req, res) {
		Review.find({
			placeId: req.param('placeId'),
		}, (err, reviews) => {
			if (err) {
				return res.send(err);
			}
			return res.json(reviews);
		});
	}
	create(req, res) {
		Review.create({
			placeId: req.param('placeId'),
			text: req.param('text'),
			rating: req.param('rating'),
		}, (err, review) => {
			if (err) {
				return res.send(err);
			}
			return res.json(review);
		});
	}
	delete() {

	}
	edit() {

	}
}

export default ReviewController;
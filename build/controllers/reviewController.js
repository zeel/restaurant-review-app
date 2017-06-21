'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _review = require('../models/review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReviewController = function () {
	function ReviewController() {
		_classCallCheck(this, ReviewController);
	}

	_createClass(ReviewController, [{
		key: 'list',
		value: function list(req, res) {
			_review2.default.find({
				placeId: req.param('placeId')
			}, function (err, reviews) {
				if (err) {
					return res.send(err);
				}
				return res.json(reviews);
			});
		}
	}, {
		key: 'create',
		value: function create(req, res) {
			_review2.default.create({
				placeId: req.param('placeId'),
				text: req.param('text'),
				rating: req.param('rating')
			}, function (err, review) {
				if (err) {
					return res.send(err);
				}
				return res.json(review);
			});
		}
	}, {
		key: 'delete',
		value: function _delete() {}
	}, {
		key: 'edit',
		value: function edit() {}
	}]);

	return ReviewController;
}();

exports.default = ReviewController;
module.exports = exports['default'];
//# sourceMappingURL=reviewController.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Define a schema
var Schema = _mongoose2.default.Schema; //Require Mongoose


var ReviewSchema = new Schema({
	text: String,
	rating: {
		type: Number,
		default: 0
	},
	profile_photo_url: String,
	author_name: String,
	placeId: {
		type: String,
		required: true
	}
}, {
	collection: 'reviews',
	timestamps: true
});

exports.default = _mongoose2.default.model('Review', ReviewSchema);
module.exports = exports['default'];
//# sourceMappingURL=review.js.map
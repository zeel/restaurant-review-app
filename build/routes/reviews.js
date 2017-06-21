'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (router) {
	router.post('/review', controller.create);
	router.get('/review/:placeId', controller.list);
	router.delete('/review/:id', controller.delete);
	router.put('/review/:id', controller.edit);
	return router;
};

var _express = require('express');

var _ReviewController = require('../controllers/ReviewController');

var _ReviewController2 = _interopRequireDefault(_ReviewController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

var controller = new _ReviewController2.default();

module.exports = exports['default'];
//# sourceMappingURL=reviews.js.map
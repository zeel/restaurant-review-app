'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (router) {
	router.get('/', function (req, res, next) {
		res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'), {
			title: 'Review App'
		});
	});

	return router;
};

var path = require('path');

module.exports = exports['default'];
//# sourceMappingURL=index.js.map
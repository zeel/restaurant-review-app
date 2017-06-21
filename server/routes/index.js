const path = require('path');

export default function(router) {
	router.get('/', function(req, res, next) {
		res.sendFile(
			path.resolve(__dirname, '..', 'client', 'public', 'index.html'), {
				title: 'Review App'
			}
		);
	});

	return router;
}
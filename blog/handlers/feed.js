var path = require('path'),
	handler = require('./handler.js'),
	articleAPI = require('../article.js');

function getTemplateData() {
	return {
		articles : articleAPI.getAll()
	};
}

module.exports = {

	register : function(app) {
		app.get('/feed/rss.xml', function(req, res) {
			res.contentType('application/xml');
			res.render('feed', getTemplateData());
		});
	},

	generate : function(dir) {
		handler.createHtmlFile(
			path.join(dir, 'feed', 'rss.xml'),
			'feed',
			getTemplateData()
		);
	}

};

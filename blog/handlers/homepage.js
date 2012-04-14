var path = require('path'),
	handler = require('./handler.js'),
	articleAPI = require('../article.js');

function getTemplateData() {
	return {
		articles : articleAPI.getRecent(10),
		recent_articles : articleAPI.getRecent()
	};
}

module.exports = {

	register : function(app) {
		app.get('/', function(req, res) {
			res.render('homepage', getTemplateData());
		});
	},

	generate : function(dir) {
		handler.createHtmlFile(
			path.join(dir, 'index.html'),
			'homepage',
			getTemplateData()
		);
	}

};

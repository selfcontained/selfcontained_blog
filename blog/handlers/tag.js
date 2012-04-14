var path = require('path'),
	handler = require('./handler.js'),
	articleAPI = require('../article.js');

function getTemplateData(tag) {
	return {
		articles : articleAPI.getByTag(tag),
		recent_articles : articleAPI.getRecent(),
		tag : tag
	};
}

module.exports = {

	register : function(app) {
		app.get('/tag/:tag/', function(req, res) {
			res.render('tag', getTemplateData(req.param('tag')));
		});
	},

	generate : function(dir) {
		Object.keys(articleAPI.tags()).forEach(function(tag) {
			handler.createHtmlFile(
				path.join(dir, 'tag', tag, 'index.html'),
				'tag',
				getTemplateData(tag)
			);
		});
	}

};

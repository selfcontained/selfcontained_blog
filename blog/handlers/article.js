var path = require('path'),
	handler = require('./handler.js'),
	articleAPI = require('../article.js');


function getTemplateData(article) {
	return {
		recent_articles : articleAPI.getRecent(),
		article : article
	};
}

module.exports = {

	register : function(app) {
		app.get(/^\/(\d){4}\/(\d){2}\/(\d){2}\/(.+)\/$/, function(req, res) {
			var article = articleAPI.get(req.params[3]);
			if(article && article.publish) {
				res.render('article', getTemplateData(article));
			}else {
				res.render('404', {
					status: 404,
					recent_articles : articleAPI.getRecent()
				});
			}
		});
	},

	generate : function(dir) {
		articleAPI.getAll().forEach(function(article) {
			if(article.publish) {
				handler.createHtmlFile(
					path.join(dir, article.path, 'index.html'),
					'article',
					getTemplateData(article)
				);
			}
		});
	}

};

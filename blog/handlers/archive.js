var handler = require('./handler.js'),
	articleAPI = require('../article.js');

function getTemplateData() {
	return {
		recent_articles : articleAPI.getRecent(),
		articles : articleAPI.getAll()
	};
}

module.exports = {

	register : function(app) {
		app.get('/archive/', function(req, res) {
			res.render('archive', getTemplateData());
		});
	},

	generate : function(dir) {
		handler.createHtmlFile(
			require('path').join(dir, 'archive', 'index.html'),
			'archive',
			getTemplateData()
		);
	}

};

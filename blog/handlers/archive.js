var handler = require('./handler.js'),
	articleAPI = require('../article.js');

function getTemplateData(blog) {
	var config = blog.config();
	return {
		recent_articles : articleAPI.getRecent(),
		articles : articleAPI.getAll(),
		title : 'archive - ' + config.title,
		keywords : config.keywords
	};
}

module.exports = {

	register : function(blog) {
		blog.app().get('/archive/', function(req, res) {
			res.render('archive', getTemplateData(blog));
		});
	},

	generate : function(blog, dir) {
		handler.createHtmlFile(
			require('path').join(dir, 'archive', 'index.html'),
			'archive',
			getTemplateData(blog)
		);
	}

};

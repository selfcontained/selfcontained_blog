var path = require('path'),
	handler = require('./handler.js'),
	articleAPI = require('../article.js');

function getTemplateData(blog, tag) {
	var config = blog.config();
	return {
		articles : articleAPI.getByTag(tag),
		recent_articles : articleAPI.getRecent(),
		tag : tag,
		title : tag + ' - ' + config.title,
		keywords : config.keywords
	};
}

module.exports = {

	register : function(blog) {
		blog.app().get('/tag/:tag/', function(req, res) {
			res.render('tag', getTemplateData(blog, req.param('tag')));
		});
	},

	generate : function(blog, dir) {
		Object.keys(articleAPI.tags()).forEach(function(tag) {
			handler.createHtmlFile(
				path.join(dir, 'tag', tag, 'index.html'),
				'tag',
				getTemplateData(blog, tag)
			);
		});
	}

};

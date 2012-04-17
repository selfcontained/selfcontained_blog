var path = require('path'),
	handler = require('./handler.js');

function getTemplateData(blog) {
	return {
		articles : blog.api.getRecent(10),
		recent_articles : blog.api.getRecent(),
		title : blog.title,
		keywords : blog.keywords
	};
}

module.exports = {

	register : function(blog) {
		blog.app.get('/', function(req, res) {
			res.render('homepage', getTemplateData(blog));
		});
	},

	generate : function(blog, dir) {
		handler.createHtmlFile(
			path.join(dir, 'index.html'),
			'homepage',
			getTemplateData(blog)
		);
	}

};

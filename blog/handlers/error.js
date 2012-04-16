var path = require('path'),
	handler = require('./handler.js');

function getTemplateData(blog) {
	var config = blog.config();
	return {
		recent_articles : blog.api().getRecent(),
		title : config.title,
		keywords : config.keywords
	};
}

module.exports = {

	generate : function(blog, dir) {
		handler.createHtmlFile(
			path.join(dir, '404.html'),
			'404',
			getTemplateData(blog)
		);
	}

};

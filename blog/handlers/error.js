var path = require('path'),
	handler = require('./handler.js'),
	articleAPI = require('../article.js');

function getTemplateData() {
	return {
		recent_articles : articleAPI.getRecent()
	};
}

module.exports = {

	generate : function(dir) {
		handler.createHtmlFile(
			path.join(dir, '404.html'),
			'404',
			getTemplateData()
		);
	}

};

var	path = require('path'),
	authors = require('../config/authors.json'),
	ARTICLE_CONFIG = 'article.json',
	ARTICLE_CONTENT = 'article.md',
	ARTICLES_PATH = path.normalize(__dirname+'/../articles'),
	crypto = require('crypto'),
	fs = require('fs'),
	moment = require('moment'),
	marked = require('marked').setOptions({
		gfm: true,
		pedantic: false,
		sanitize: false,
		highlight: function(code, lang) {
			return require('highlight').Highlight(code);
		}
	}),
	api,
	//in memory collection of sorted articles
	sortedArticles = [],
	//in memory collection of indexed articles
	keyedArticles = {},
	//in memory collection of tags => array of article slugs using that tag
	tags = {};

function constructArticle(folder) {
	var articleConfig = path.join(ARTICLES_PATH, folder, ARTICLE_CONFIG),
		articleContent = path.join(ARTICLES_PATH, folder, ARTICLE_CONTENT),
		pub_date,
		article;
	if (path.existsSync(articleConfig) && path.existsSync(articleContent)) {
		article = require(articleConfig);
		if(article.publish) {
			article.content = marked(fs.readFileSync(articleContent, 'utf8'));
			article.author = authors[article.author];

			pub_date = moment(article.date, 'YYYY-MM-DD hh:mm:ss');
			article.formatted_date = pub_date.format('dddd MMMM D, YYYY');
			article.slug = folder;
			article.path = pub_date.format('/YYYY/MM/DD/')+folder+'/';
			if (article.author.gravatar && !article.author.gravatar_hash) {
				article.author.gravatar_hash = crypto.createHash('md5').update(article.author.gravatar).digest("hex");
			}
		}else {
			article = null;
		}
	}
	return article;
}

function parseDirectory (cb) {
	fs.readdir(ARTICLES_PATH, function(err, files) {
		if (err) throw new Error(err);

		var article;
		files.forEach(function(folder) {
			article = constructArticle(folder);
			if(article) sortedArticles.push(article);
		});

		sortedArticles.sort(function(a,b) {
			a = Date.parse(a.date);
			b = Date.parse(b.date);
			if (a < b)
				return 1;
			if (a > b)
				return -1;
			return 0;
		}).forEach(function(article) {
			keyedArticles[article.slug] = article;
			(article.tags||[]).forEach(function(tag) {
				if(!tags[tag]) tags[tag] = [];
				tags[tag].push(article.slug);
			});
		});
		cb(sortedArticles);
	});
}

module.exports = api = {

	load : function (cb) {
		parseDirectory(cb);
		return api;
	},

	getAll : function() {
		return sortedArticles;
	},

	getRecent : function (count) {
		return sortedArticles.slice(0, count||25);
	},

	get : function (folder) {
		return keyedArticles[folder];
	},

	getByTag : function(tag) {
		var articles = [];
		(tags[tag]||[]).forEach(function(slug) {
			articles.push(api.get(slug));
		});
		return articles;
	},

	tags : function() {
		return tags;
	}

};

require('./js_utils');

function addGravatarHash(authors) {
	var key,
		crypto = require('crypto');
	for(key in authors) {
		if (authors[key].gravatar) {
			authors[key].gravatar_hash = crypto.createHash('md5').update(authors[key].gravatar).digest("hex");
		}
	}
	return authors;
}

var Blog = function() {};

Blog.prototype = {

	app : null,

	config : null,

	api : null,

	handlers : null,

	authors : null,

	log : null,

	init : function(config) {
		this.init = function() {};

		this.config = config;
		require('winston').cli().extend(this);
		this.api = require('./article.api.js').create();
		this.authors = addGravatarHash(config.authors);
		this.handlers = [
			require('./handlers/assets.js'),
			require('./handlers/error.js'),
			require('./handlers/homepage.js'),
			require('./handlers/article.js'),
			require('./handlers/archive.js'),
			require('./handlers/feed.js'),
			require('./handlers/tag.js')
		];
		return this;
	},

	/**
	 * Create and setup http server for serving blog dynamically
	 */
	createApp : function(config) {
		var express = require('express'),
			self = this;

		config = Object.extend({
			templates : __dirname+'/../theme/templates',
			view_engine: 'jade',
			view_options: { layout: false },
			view_cache: false,
		}, (config||{}));

		this.app = express.createServer();
		this.app.configure(function(){
			this.set('views', config.templates);
			this.set('view engine', config.view_engine);
			this.set('view options', config.view_options);
			this.set('view cache', config.view_cache);
			this.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
			this.use(express.bodyParser());
			this.use(express.static(__dirname + '/../theme/static'));
			this.use(this.router);
		});
		this.handlers.forEach(function(handler) {
			handler.register && handler.register(self);
		});
		return this;
	},

	/**
	 * Load article data into memory
	 */
	load : function(cb) {
		var self = this,
			articlePath = require('path').normalize(__dirname+'/..'+this.config.articles);

		this.api.load(articlePath, function() {
			cb.call(self);
		});
	},

	/**
	 * Create static version of blog in specified directory
	 */
	generate : function(dir) {
		var fs = require('fs'),
			self = this;

		if(require('path').existsSync(dir)) {
			require('wrench').rmdirSyncRecursive(dir);
			this.info('removed directory: %s', dir);
		}
		fs.mkdir(dir, function(err) {
			if(err) {
				self.info(err);
			}else {
				self.info('Created directory: %s', dir);
				self.handlers.forEach(function(handler) {
					handler.generate(self, dir);
				});
			}
		});
	},

	/**
	 * Pass-thru
	 */
	listen : function(port) {
		this.app.listen(port);
		this.info("Express server listening.", { port : this.app.address().port } );
		return this;
	}

};

module.exports = new Blog();

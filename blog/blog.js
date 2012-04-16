var Blog = function(config) {
	this.config = config;
	this.api = require('./article.api.js').create(),
	this.handlers = [
		require('./handlers/assets.js'),
		require('./handlers/error.js'),
		require('./handlers/homepage.js'),
		require('./handlers/article.js'),
		require('./handlers/archive.js'),
		require('./handlers/feed.js'),
		require('./handlers/tag.js')
	];
};

Blog.prototype = {

	app : null,

	config : null,

	api : null,

	handlers : null,

	/**
	 * Create and setup http server for serving blog dynamically
	 */
	createApp : function(config) {
		var express = require('express'),
			self = this;

		this.app = express.createServer();
		this.app.configure(function(){
			self.app.set('views', config.templates);
			self.app.set('view engine', config.view_engine);
			self.app.set('view options', config.view_options);
			self.app.set('view cache', config.view_cache);
			self.app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
			self.app.use(express.bodyParser());
			self.app.use(express.static(__dirname + '/../theme/static'));
			self.app.use(self.app.router);
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
			console.log('removed directory: ', dir);
		}
		fs.mkdir(dir, function(err) {
			if(err) {
				console.log(err);
			}else {
				console.log('create directory: ', dir);
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
		console.log("Express server listening on port %d in %s mode", this.app.address().port, this.app.settings.env);
		return this;
	}

};

module.exports = {

	create : function(config) {
		return new Blog(config);
	}

};

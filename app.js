var blogConfig = require('./blog.json');

require('./blog/blog.js')
	.create(blogConfig)
	.load(function() {
		this.createApp({
			templates : __dirname+'/theme/templates',
			view_engine: 'jade',
			view_options: { layout: false },
			view_cache: false,
		}).listen(8001);
	});

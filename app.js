require('./blog')
	.create()
	.load(function() {
		this.createApp({
			templates : __dirname+'/theme/templates',
			view_engine: 'jade',
			view_options: { layout: false },
			view_cache: false,
		}).listen(8001);
	});

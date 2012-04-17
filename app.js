require('./blog/blog.js')
	.init(require('./blog.json'))
	.load(function() {
		this.createApp().listen(8001);
	});

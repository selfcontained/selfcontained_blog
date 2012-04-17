require('./blog/blog.js')
	.init(require('./blog.json'))
	.load(function() {
		this.generate(__dirname+'/public');
	});

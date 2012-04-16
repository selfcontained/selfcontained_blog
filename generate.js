require('./blog/blog.js')
	.create(require('./blog.json'))
	.load(function() {
		this.generate(__dirname+'/public');
	});

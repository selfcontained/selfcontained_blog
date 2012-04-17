require('./blog/blog.js')
	.init(require('./blog.json'))
	.load(__dirname+'/articles', function(err) {
		if(err) return console.error(err);
		this.generate(__dirname+'/public');
	});

require('./blog/blog.js')
	.init(require('./blog.json'))
	.load(__dirname+'/articles', function(err) {
		if(err) return console.log(err);
		this.createApp().listen(8001);
	});

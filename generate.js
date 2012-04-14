require('./blog')
	.create()
	.load(function() {
		this.generate(__dirname+'/public');
	});

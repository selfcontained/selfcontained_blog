var nw = require('nodewatch'),
	buildy = require('buildy');


function watchCss() {


	nw.add(__dirname+'/../theme/css').onChange(function(file, prev, curr, action) {
		console.log("css changed: " + file);

		new buildy.Queue('compile stylesheets')
			.task('files', [__dirname+'/../theme/css/blog.less'])
			.task('csslint')
			.task('cssminify', {paths:[__dirname+'/../theme/css']})
			.task('write', { name: __dirname+'/../public/css/blog.min.css' })
			.run();

	});
}



module.exports = {

	init : function() {
		watchCss();
	}

};

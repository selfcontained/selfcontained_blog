var fs = require('fs'),
	path = require('path'),
	wrench = require('wrench');

module.exports = {

	createHtmlFile : function(dest, template, data) {
		var templateFile = path.join(__dirname, '/../../theme/templates/', template+'.jade'),
			templateString = fs.readFileSync(templateFile, 'utf8'),
			renderer = require('jade').compile(templateString, {
				filename : templateFile
			}),
			html = renderer(data),
			destDir = '/'+(dest.split('/').slice(1, -1).join('/'));

		if(!path.existsSync(destDir)) {
			wrench.mkdirSyncRecursive(destDir);
		}
		fs.writeFileSync(dest, html);
		console.log('created file: ', dest);
	}

};

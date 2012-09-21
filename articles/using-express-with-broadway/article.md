[Express][] is by no doubt an extremely popular http application server/framework for node.js.  In this article I'd like to demonstrate how you can take advantage of [broadway][] and [express][Express] together.

In this approach, we'll treat the *http server* that ```express``` provides as just another plugin to our ```broadway``` application.

## express http plugin

First we'll create an http plugin encapsulating express.

```javascript
// http.js

var express = require('express');

var HttpPlugin = exports;

HttpPlugin.name = 'http';

HttpPlugin.attach = function(options) {
	var app = this;

	var server = app.http = express();
	server.use(server.router);

	require('./routes')(app);
};

HttpPlugin.init = function(done) {
	done();
};
```

I'd also suggest defining your routes in their own module(s), and passing along the broadway application.  This will allow them to take full advantage of any other functionality your application acquires through other plugins.

```javascript
// routes.js
module.exports = function(app) {

	app.http.get('/', function(req, res){
		res.send('express on broadway');
	});

};
```

## broadway.concat(express)

Next we'll create a broadway application and toss in our http plugin.

```javascript
// app.js

var broadway = require('broadway'),
	app = new broadway.App();

app.use(require('./http'));

app.init(function(err) {
	app.http.listen(8080);
});
```

You can also just ```module.exports = app.http``` if you're using something like ```up``` and need to export an http server from your main applicaiton.

## krakens.release()

Finally, fire up your application

```
>node app.js
```

That's all there is to it.  In this example, the http server is just one piece of our application, and we can bolt on additional functionality as needed through more plugins.


[Express]: http://expressjs.com/
[broadway]: https://github.com/flatiron/broadway
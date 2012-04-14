When it comes time to deploy a [node.js][] application, you'll want to examine how you can benefit from your hardware and take advantage of multiple cpus.  Node is single threaded, so having one process run your application on a server with more than one cpu isn't optimal.  Fortunately, like many things on node, it's simple to do so.

Let's take the following example of a dead simple http server:

```javascript
	require('http').createServer(function(req, res) {
		res.writeHead(200);
		res.end('this is dead simple');
	}).listen(3001);
```

You've got that saved in a file, let's call it _app.js_.  You start it up...

```
	> node app.js
```

...and it's amazing, it writes out text to all those that visit your site, just like you want.  It's become an overnight internet sensation, and now you want to know what crazy hoops you'll have to jump through to scale it up and take advantage of all the cpus on your server.  Enter the [cluster][] module.

We'll create a new file that we'll use in production to launch our application.  Let's call it ```cluster.js```.

```javascript
	var cluster = require('cluster');

	if (cluster.isMaster) {
		//start up workers for each cpu
		require('os').cpus().forEach(function() {
			cluster.fork();
		});

	} else {
		//load up your application as a worker
		require('./app.js');
	}
```

When you start your app now...

```
	> node cluster.js
```

...node will recognize that the cluster is the master, and then you simply fork the cluster for each cpu you have.  Those in turn will start up, and those workers won't be the master, so they'll just load up your ```app.js``` and start up a process for each cpu.

But wait, doesn't each worker have to listen on a different port?

>	"The cluster module allows you to easily create a network of processes that all share server ports."

One TCP server is shared between all workers, so they can all be listening on the same port.

Awesome, you're now handling loads of traffic, but after a day you realize two of your workers died because you had an exception being thrown in that complex codebase of yours.  How can you make sure you keep them running?

```javascript
	if(cluster.isMaster) {
		//start up workers for each cpu
		require('os').cpus().forEach(function() {
			cluster.fork();
		});

		cluster.on('death', function(worker) {
			console.log('worker ' + worker.pid + ' died');
			cluster.fork();
		});
	}
```

Listen for the 'death' event on the cluster, and just fork a new worker if one dies.  Simple huh?  Keep in mind, every worker is it's own process, therefor they don't share memory.

[node.js]: http://nodejs.org
[cluster]: http://nodejs.org/docs/latest/api/cluster.html

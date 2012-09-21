## the why

Why should you worry about decoupling your node.js application?  Can't you just use the module pattern and ```require()``` away?  Sure, sort of...until your application starts to grow, and module's begin to have cross dependencies.  In reality, you can avoid cross dependencies between modules for most small to medium sized applications, but as your application grows, you may run into [cyclic][] [dependencies][], which can be hard to decipher and debug.  Without going into detail on what those are (follow those links if you're wondering), I present, a contrived example.


```javascript
var ModuleA = require('module-a'),
	ModuleB = require('module-b');

var ModuleC = module.exports = function() {
	this.myB = new ModuleB();
};

ModuleC.prototype = {

	/** amazin' function! */
	amazinFunction : function() {
		if(ModuleA.isAmazin(this.myB) {
			this.beginAwesomness();
		}else {
			this.sadPanda();
		}
	},

	beginAwesomness : function() { /** awesome stuff */ },

	sadPanda : function() { /** sad stuff */ }

};
```

Here ```ModuleC``` is exported, and is a pretty basic function/prototype that has some required dependencies.  The principle of dependency injection would tell us that instead of ModuleC being responsible for loading ModuleA and ModuleB, those should be injected into it somehow.  [Broadway][] is a fantastic library to help with this.

## broadway

At it's core, [Broadway][] provides a plugin architecture for applications, and a consistent way to manage and add functionality.  It also gives us a nice platform for dependency injection, and inversion of control, letting the modules alter and build on the application instead of the application being responsible to build everything and pull in your modules' functionality.  If you're interested in this concept, [this article][nodejitsu_blog] from the Nodejitsu blog is super informative.

So, let's start with a basic Broadway application, and load up a plugin that we'll define below.

```javascript
var broadway = require('broadway'),
	app = new broadway.App();

app.use(require('myposse'));

app.init(function(err) {
	// we're all setup, gtg
});
```

A basic Broadway plugin might look something like...

```javascript
// myposse.js

var MyPosse = exports;

MyPosse.name = 'myposse';

MyPosse.attach = function(options) {
	var app = this;

	// here we can add some functionality to the app
	app.posse = function() {
		console.log("my posse's on broadway");
	};
};

MyPosse.init = function(done) {
	// handle any asynchronous initilization
	done();
};
```

RIP MCA.  Inside our ```attach``` function is where we can pull in our related modules, and expose them to the application.  Notice how we're calling the result of the require statement of each module, passing in the Broadway application, and setting that onto the application itself.

```javascript
MyPosse.attach = function(options) {
	var app = this;

	app.ModuleA = require('module-a')(app);
	app.ModuleB = require('module-b')(app);
	app.ModuleC = require('module-c')(app);
	
};
```

We would want to rework our above example of ModuleC to allow for this change, which also lets us remove the require statements for ModuleA and ModuleB, and pull them in as dependencies from the ```app``` object.

```javascript
module.exports = function(app) {

	var ModuleA = app.ModuleA,
		ModuleB = app.ModuleB;

	var ModuleC = function() {
		this.myB = new ModuleB();
	};

	ModuleC.prototype = {

		/** amazin' function! */
		amazinFunction : function() {
			if(ModuleA.isAmazin(this.myB) {
				this.beginAwesomness();
			}else {
				this.sadPanda();
			}
		},

		beginAwesomness : function() { /** awesome stuff */ },

		sadPanda : function() { /** sad stuff */ }

	};

	return ModuleC;

};
```

With Broadway you can organize your application's modules and expose their functionality to the application via plugins.  I've found it a great way to organize services, models, and other application resources, and expose them to the application without coupling them directly to eachother via ```require``` statements.  There's definitely a place for modules that are independant enough to be ```require()'d``` at will, but I've also found that there's a place for application specific modules that are best managed at an application level.

There's a lot more [Broadway][] has to offer (such as application events), so check it out if you're building large applications on node.js.


[cyclic]: /2012/05/08/node-js-circular-dependencies/
[dependencies]: http://nodejs.org/api/modules.html#modules_cycles
[Broadway]: http://github.com/flatiron/broadway
[nodejitsu_blog]: http://blog.nodejitsu.com/ioc-and-dependency-injection-with-broadway
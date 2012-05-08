Circular Dependencies in modules can be tricky, and hard to debug in [node.js][].  If module `A` `requires('B')` before it has finished setting up it's exports, and then module `B` `requires('A')`, it will get back an empty object instead what `A` may have intended to export.  It makes logical sense that if the export of `A` wasn't setup, requiring it in `B` results in an empty export object.  All the same, it can be a pain to debug, and not inherently obvious to developers used to having those circular dependencies handled automatically.  Fortunately, there are rather simple approaches to resolving the issue.

##example.broken() === true

Let's define a broken scenario to clearly illustrate the issue.  Module `A` delegates to an instance of Module `B` to `do some important stuff()`.

###Module A
```javascript
var B = require('./B'),
	id,
	bInstance;

var A = module.exports = {
	init : function(val) {
		id = val;
		bInstance = new B();
		return this;
	},

	doStuff : function() {
		bInstance.stuff();
		return this;
	},

	getId : function() {
		return id;
	}
};
```

###Module B
```javascript
var A = require('./A');

var B = module.exports = function(){
	return {
		stuff : function() {
			console.log('I got the id: ', A.getId());
		}
	};
};
```

###Tie them together
```javascript
require('./A.js')
	.init(1234)
	.doStuff();
```

With this you'll end up with an error:
```javascript
TypeError: Object #<Object> has no method 'getId'
	at Object.stuff (/Users/bharris/workspace/circular-dep/B.js:7:36)
	at Object.doStuff (/Users/bharris/workspace/circular-dep/A.js:18:13)
	at Object.<anonymous> (/Users/bharris/workspace/circular-dep/test.js:4:3)
```

The issue is that when `A` is required at the top of `B`, it ends up being an empty object, which doesn't have a `getId` method.

##example.solutions().length === 2

I'll explain two simple solutions to this issue:

+	[delay invocation of dependency until runtime](#delay)
+	[replace circular dependency with dependency injection](#inject)

<a name="delay"></a>
##delay invocation of dependency until runtime

If we move the require statements to where they are needed at runtime, it will delay the execution of them, allowing for the exports to have been created properly.  In this example, we can get away with simply moving the `require('./B')` statement.

###Module A
```javascript
var id,
	bInstance;

var A = module.exports = {
	init : function(val) {
		id = val;
		bInstance = new require('./B')();
		return this;
	},

	doStuff : function() {
		bInstance.stuff();
		return this;
	},

	getId : function() {
		return id;
	}
};
```

This feels like a bit of bandaid to this particular problem, but perhaps is the right solution in some cases.

<a name="inject"></a>
##replace circular dependency with dependency injection

The only dependecy that `B` currently has on `A` is an id property it needs access to.  We could just pass the id into the constructor of `B`, but let's assume `A` is more significant to the operations `B` must perform, and a proper reference is required.  If we inject that dependency we'll allow for a loose coupling between the two modules, and have a slightly more elegant solution.  Zing!

###Module A
```javascript
var B = require('./B'),
	id,
	bInstance;

var A = module.exports = {
	init : function(val) {
		id = val;
		bInstance = new B(this);
		return this;
	},

	getId : function() {
		return id;
	},

	doStuff : function() {
		bInstance.stuff();
		return this;
	}
};
```

###Module B
```javascript
var B = module.exports = function(val){
	var dependency = val;
	return {
		stuff : function() {
			console.log('I got the id: ', dependency.getId());
		}
	};

};
```
### #winning

```javascript
DependencyInjection
	.merge(LooseCoupling)
	.attach($);
```

I put my `$` on [dependency injection][] and [loose coupling][].

[node.js]: http://nodejs.org
[dependency injection]: http://en.wikipedia.org/wiki/Dependency_injection
[loose coupling]: http://en.wikipedia.org/wiki/Loose_coupling

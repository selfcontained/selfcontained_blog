PHP is quirky.  I've heard it called other things, but I'll leave it at that.  I had a great learning experience while writing an abstract singleton class.  Static binding in PHP behaves uniquely, and is often a hurdle when you try and develop an kind of an API using inheritance and static properties.  If you aren't familiar with static binding in PHP, [read the doc on late static binding][lsb] and it will give you a good overview.  This issue came up while creating an abstract singleton class.

Let me explain by example.  Here's my first pass at a simple abstract singleton class that I could theoretically extend from other classes, and just pick up "singleton" behavior.  Disclaimer!!! Don't use this class, it doesn't work!

```php
abstract class Singleton {

	private static $instance = null;

	final public static function getInstance() {

		if(static::$instance === null) {
			static::$instance = new Singleton();
		}
		return static::$instance;
	}

	protected function __construct() { }

}
```

This worked, initially, until I created two classes that extended ```Singleton``` and found the second one I called behaved remarkably like the first one.

```php
class FirstSingleton extends Singleton {
...
}
class SecondSingleton extends Singleton {
...
}
```

Any calls to ```SecondSingleton::getInstace()``` were really just returning the ```FirstSingleton``` instance.  Since the ```private static $instance``` property is delcared on the abstract ```Singleton``` class, there was really just one ```$instance``` being stored across calls to ```getInstance()``` from various subclasses.  PHP doesn't bind the ```$instance``` property to the called class, it is bound to the class where it is declared, ```Singleton``` in this case.  You _could_ declare the ```$instance``` property on all classes that extend ```Singleton```, but that is defeating the point of the abstract class.  Here's round two, which does work, but I have mixed feelings about:

```php
abstract class Singleton {

	private static $instances;

	final public static function getInstance() {
		$className = get_called_class();

		if(isset(self::$instances[$className]) == false) {
			self::$instances[$className] = new static();
		}
		return self::$instances[$className];
	}

	protected function  __construct() { }

}
```

The change here is that instead of storing a single ```$instance``` property on the abstract ```Singleton``` class, we're storing an array of instances, indexed by the class name of the called class.  It behaves as expected, but the code isn't as clear or clean as I would have hoped it would be.

[lsb]: http://us3.php.net/lsb

I like [PHPUnit][], and I like [closures][], but haven't found many useful cases for them (closures) in PHP yet.  Just recently I came across a situation where I needed a closure when working with PHPUnit Mock objects.  For those not familiar with Mock Objects in regards to testing, [here's a link][mocks].  It's fairly common when creating a mock object for testing to specify what a function is expected to be called with, and what it will return in that case.  Below I'm creating a mock 'User' object that will return 18 for the age however many times it is called.
```php
class UserTest extends PHPUnit_Framework_TestCase{

	public function testGetAge() {
		$user = $this->getMock('User', array('getAge'))
			->expects($this->any())
			->method('getAge')
			->will($this->returnValue(18));
		$this->assertTrue($user->getAge(), 18);
	}

}
```
This is a pretty straight forward example of Mocks, but what happens when the value you want to return is dependent on the value it is called with, and there is some logic required to process this?  This is where closures come in handy.  Let's say you have a dynamic array you've built up, and you want to return true if a particular function, **hasValue** is called with a value that exists in that array.  Here's how you can do it with **Mocks** and **closures**, using the **returnCallback** functionality of PHPUnit:
```php
class UserTest extends PHPUnit_Framework_TestCase{

	public function testInArray() {
		$values = array(1,10,78,30);
		$user = $this->getMock('User', array('hasValue'))
			->expects($this->any())
			->method('hasValue')
			->with($this->anything())
			->will($this->returnCallback(function($value) use ($values){
				return in_array($value, $values);
			}));
		$this->assertTrue($user->hasValue(10));
		$this->assertTrue($user->hasValue(99) == false);
	}

}
```
When I call **hasValue**, passing in 10, we'll get true, and with 99 it's false.  This is checked at runtime when the closure is executed, checking against the **$values** array.  Also, stay away from [Canvas Rider][], it's dangerously addictive.

[PHPUnit]: http://www.phpunit.de/manual/3.6/en/index.html
[closures]: http://us3.php.net/manual/en/functions.anonymous.php
[mocks]: http://www.phpunit.de/manual/3.6/en/test-doubles.html#test-doubles.mock-objects
[Canvas Rider]: http://canvasrider.com/tracks/featured

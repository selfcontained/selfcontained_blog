I've often been a fan of Javascript's way of using the logical OR operator as a coalescing operator, or way to default values.  It's a very handy operator for shortening ternary expressions.

```javascript
var myValue = someOtherValue || true;
```

I just found out in PHP 5.3 they added an operator to do just that.  ```?:```

```php
$myValue = $someOtherValue ?: true;
```

That's all, carry on.

<http://www.php.net/ChangeLog-5.php#5.3.0>

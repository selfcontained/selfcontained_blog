It must have been something I ate, cause this is like the third post in 2 days I think!  This is a quick one, but super handy to know if you don't already.  There is  semi-common problem I run into, and it has to do with scoping of closures inside of loops.  Lets get straight to the code so its easier to understand what I'm talking about:

```html
<html>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/utilities/utilities.js" ></script>
<script type="text/javascript">
	var values = [0,1,2,3,4,5,6,7,8,9];
	for(var idx in values) {
		//First Test - will have incorrent scoping
		YAHOO.util.Event.addListener(window, 'load', function() {
			YAHOO.util.Dom.get('wrong-scope').innerHTML += ' '+values[idx]+' ';
		});
		//Second Test - scoping will be correct
		YAHOO.util.Event.addListener(window, 'load', function(scopedValue) {
			return function() {
				YAHOO.util.Dom.get('right-scope').innerHTML += ' '+scopedValue+' ';
			}
		}(values[idx]));

	}
</script>

<body>
<div id="wrong-scope">
<h1>Wrong Scope</h1>
</div>
<div id="right-scope">
<h1>Right Scope</h1>
</div>

</body>
</html>
```

In this example, there is a simple array of ordered values, and then a loop over those values.  For each iteration of the loop, there is an onload listener added that will dump that value into a div.  You'll see the first loop always dumps 9, because the scoping is wrong when the closure executes, and the last time through the loop sets the scope of ```values[idx]```.

The second section does some unique handy-work to correct the scoping.  A listener is added like before, but the closure is created in a specific fashion in order to get the scope to be the way we want at runtime.  For the closure in the second section, we create a self-executing function, passing in a parameter that is the current value in our array of numbers.  That function runs, and returns another function that does the appending to the div of the value.  This second, _inner-function_ is what will execute on page load.  Because of the outer-function we immediately called, the variable passed into it, the current value from our array, will be available, and properly scoped for our inner-function.

![scoping][]

This is a handy trick when you have a situation where you are looping over a collection, and are providing some type of callback/closure for each entry, but need some proper scoping.

[scoping]: http://www.selfcontained.us/wp-content/uploads/2009/01/scoping.gif

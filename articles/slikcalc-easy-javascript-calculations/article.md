[![Slikcalc - Easy Javascript Calculations][image]][slikcalc]

I've put together a small javascript library that greatly simplifies creating dynamic javascript calculators.  It works great for just about anything, ranging from calculating columns of values, to a complex custom formula.  You can even write your own calculators and plug them into the framework with little effort.  Calculations update automatically as the user types in their values.

## Check out the details on the library, and download it [from github][slikcalc]


```javascript
var columnCalc1 = new slikcalc.ColumnCalc({
	total: { id: 'cc-1-total' },
	registerListeners: true,
	calcOnLoad: true
});
columnCalc1.addRow({ id: 'cc-1-1' });
columnCalc1.addRow({ id: 'cc-1-2' });
columnCalc1.addRow({
	id: 'cc-1-3',
	checkbox: { id: 'cc-1-3-c' }
});
```

A few key features of Slikcalc:

+	Slikcalc works with popular Javascript libraries, including YUI, jQuery, Dojo, Mootools and Prototype.  Adding support for new libraries is very simple as well.

+	Slikcalc handles attaching your event listeners for when the users type in values, click checkboxes, and when the page loads.


+	Slikcalc provides a simple interface for chaining multiple calculators so one can fire another, and so on.

[image]: /images/slikcalc-logo.gif
[slikcalc]: https://github.com/selfcontained/slikcalc/

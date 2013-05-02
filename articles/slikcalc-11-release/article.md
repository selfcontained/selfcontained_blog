I've just released a new build of [slikcalc - javascript calculator library][slikcalc] that includes a few small bug fixes, and some shortcuts to the API.  The new API for creating calculators looks as follows:

```javascript
var columnCalc1 = slikcalc.create('column', {
	total: { id: 'cc-1-total' },
	registerListeners: true,
	calcOnLoad: true
});
```

as opposed to:

```javascript
var columnCalc1 = new slikcalc.ColumnCalc({
	total: { id: 'cc-1-total' },
	registerListeners: true,
	calcOnLoad: true
});
```

Its a small change, but I think it's easier to use.  Of course, the old way will still work, so existing code will not break with the addition to the API.  Some other additions include a new, fully commented debug version of the code, along with using YUI compressor for the minified version, which shaved off a few kb from previous versions.  [Full documentation][docs] is also included in the download.  Take a look and feel free to comment with any feedback.

[slikcalc]: https://github.com/selfcontained/slikcalc/
[docs]: http://slikcalc.selfcontained.us/docs/1.1/

While working on [slikcalc][], I was trying to find the easiest way to format a number for currency.  I had found some implementations that were pretty complex, using regex and absolute values, and thought there had to be a simpler way.  This is what I came up with and it works in all the browsers I've tested (IE 6/7, Firefox 2 (windows & mac), Opera 9 (windows and mac).

```javascript
function formatCurrency(num) {
	num = isNaN(num) || num === '' || num === null ? 0.00 : num;
	return parseFloat(num).toFixed(2);
}
```

Just thought I'd share for anyone working with something similar.

[slikcalc]: http://slikcalc.selfcontained.us

---

>	Update: [A new native YUI function is in the works, and does this job better][new-function]

---

Recently I was working on optimizing some javascript, and found a slow area that was trying to find the first focusable input in a certain area of the page, and it was taking anywhere from 100 - 500 milliseconds, depending on the size of the DOM tree in that element.  After digging into it, I noticed it was using the ```YAHOO.util.dom.getElementsBy()``` method, which basically had to walk through the whole DOM tree in this case, testing each node against the boolean method passed in.  After calling that, it would then return the first, if any, element that getElementsBy returned.  Obviously this was a bad approach, as after you find the first match, there is no need to go further.

I did a little research, and saw that this had come up in [a thread on the YUI group][thread].  I ended up writing a small method to fill in this functionality I wanted out of YUI, called ```getFirstDescendantBy(rootEl, method)```.  The function takes a root element, or string id of that element, and then a function to test each element against that has the element being tested as the only input.  This function passed in should return a boolean, and is similar to the way the YUI dom function ```getElementsBy()``` works.  Hopefully this will help out some people in similar situations.

```javascript
function getFirstDescendantBy(rootEl, method) {
	var root = typeof rootEl === 'string' ? document.getElementById(rootEl) : rootEl;
	var firstDescendant = null;
	var children = root.childNodes;
	for(var idx in children) {
		var child = children[idx];
		if(child.nodeType === 1) {
			if(method(child)) {
				firstDescendant = child;
				break;
			}else if(child.childNodes.length > 0) {
				var recursiveResult = getFirstDescendantBy(child, method);
				if(recursiveResult !== null) {
					firstDescendant = recursiveResult;
					break;
				}
			}
		}
	}
	return firstDescendant;
}
```

[new-function]: /2009/01/22/followup-on-yui-getfirstdescendantby/
[thread]: http://tech.groups.yahoo.com/group/ydn-javascript/message/19684

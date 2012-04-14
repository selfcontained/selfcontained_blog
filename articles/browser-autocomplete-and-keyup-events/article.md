---

> Update: This issue appears resolved in modern browsers, and was only noticed in IE7 and Firefox 3 (Linux & Windows)

---

Browser oddities are nothing new, but I came across one today that I haven't heard about before, and couldn't seem to find many comments about on the interwebs.  To get to the gist of it, when the native browser autocomplete functionality pops up for a text input, it also triggers a keyup event for the input.  I had some logic going on where I was firing an ajax lookup request as a user types in a value, and was waiting for a delay in their typing to fire the ajax request.  I noticed I would often get two events fired at almost the same time.  At first I chalked it up to oddities with setTimeout() not being completely accurate, but with more investigation, the native autocomplete that the browser supplies was the culprit.

To try this for yourself, here is the test code I was using:

```html
<html>
	<script type="text/javascript">
		function handleEvent() {
			document.getElementById('keyup-test').innerHTML += document.getElementById('test').value + '<br />';
		}
	</script>
<body>
	<form action="">
	<div id="keyup-test"><h1>Test Keyup Event</h1></div>
	<input type="text" id="test" onkeypress="handleEvent();" value="bradharris" />
	</form>
</body>
</html>
```

You'll see the current value of the input written out into a div above the input on each keyup event.  To get the autocomplete functionality of the browser working, just type in a value, and then submit the page by pressing enter when the input is focused.  The browser will then have that entry in its history of values for that input, and will start firing the keyup an extra time when it finds a match and shows the autocomplete box.  To turn it off, just add ```autocomplete="off"``` to the input tag, then it should only fire once per keyup.  I'm pretty perplexed as to why this exists, and I've seen it in **IE7 and Firefox3 (Linux and Windows)**.  If anyone knows why its around, I'd love to hear.

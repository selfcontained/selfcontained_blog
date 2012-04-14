Just a simple script I use to automate image rollovers that may be of use to others.  Just include this javascript:

---

>	UPDATED: I felt motivated to simplify this even more according to many of the comments below.  This takes advantage of html5 data attributes instead of a custom one, and eliminates the need for a special hover css class.  It also eliminates the need for a temporary variable to store the current image in by using a 'tmp' attribute, and then removing it when finished.  It also preloads the images for the rollover.

---

```javascript
$(function() {
	$('img[data-hover]').hover(function() {
		$(this).attr('tmp', $(this).attr('src')).attr('src', $(this).attr('data-hover')).attr('data-hover', $(this).attr('tmp')).removeAttr('tmp');
	}).each(function() {
		$('<img />').attr('src', $(this).attr('data-hover'));
	});;
});
```

This should be used with an img element as follows:

```html
<img src="first.gif" data-hover="second.gif" />
```

---

Original code:

```javascript
$(function() {
	$('.rollover').hover(function() {
		var currentImg = $(this).attr('src');
		$(this).attr('src', $(this).attr('hover'));
		$(this).attr('hover', currentImg);
	}, function() {
		var currentImg = $(this).attr('src');
		$(this).attr('src', $(this).attr('hover'));
		$(this).attr('hover', currentImg);
	});
});
```

This will pick up an image that looks as follows, and setup the rollover image:

```html
<img src="first.gif" hover="second.gif"  class="rollover"/>
```

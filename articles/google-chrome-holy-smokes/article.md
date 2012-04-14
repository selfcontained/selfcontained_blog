The cats out of the bag, Google released their new browser, [Chrome][].  I was pretty excited about the new features that this browser would include, some of which are a brand new Javascript VM called V8, along with using Webkit for the rendering engine.  The fact that each tab in the browser is its own process is also awesome news for web developers.  I decided to take a try using it to run the web application I develop at my job, which is a large Case Management System by [Justice Systems][jsi].

I decided to pick a fairly rich page with lots of content and javascript for the benchmark.  This page has multiple tabs, and updates a client side data model as the user edits it.  As far as page load times go, IE 7 and Firefox 2 were both right around 1.2 - 1.3 seconds just to render this page, and parse the javascript.  Chrome comes in at 663 milliseconds, about 50% faster.

The next test I performed was toggling between tabs ([YUI tabs][tabs]).  This toggling also involves some front end validation along with storing and retrieving of client side data, so I figured it was a pretty good use case for testing out the new Javascript engine.  IE 7 comes in at an average of 123 milliseconds to switch tabs, Firefox 2 at 143 milliseconds, and Chrome blows them away at 20 milliseconds.

With Chrome, Google is stating that the browser is a viable platform, which is great news for web developers who have started to see the limitations of current browsers.  It makes sense that Google would be the one to push a browser like this, as many of their products are web-based, and rely on a performant browser.  I can't help but think that they have been waiting to see if other browser vendors could step it up, but eventually just decided go ahead and get er dun' themselves.  Way to go Google, this is great news for users and developers.

[Chrome]: http://www.google.com/chrome/
[jsi]: http://www.justicesystems.com/
[tabs]: http://developer.yahoo.com/yui/tabview/

I've had a few conversations with friends and co-workers about this very topic.  My day job consists of working on a large Enterprise Application running on a Java platform.  My evenings are mostly spent (sometimes at my wifes disapproval) working on smaller websites and projects for clients in PHP.  Javascript is used fairly heavily in both scenarios, but what I've noticed over time is that how I develop in the different situations varies quite a bit.

For smaller sites I really enjoy using the jQuery framework, mostly because of its small footprint, and ease of use.  At my day job our own Javascript framework is backed by YUI, which I also really enjoy working with.  YUI is very well suited for us there as it provides great building blocks for creating your own components (not that jQuery doesn't, but theres a lot of basic components you can build off of in YUI that are only available as 3rd party plugins to jQuery).  That being said, when developing different components on an Enterprise Application I get a chance to create something that can be utilized across a large variety of pages, and more often than not, used in slightly different ways.  This leads to writing Javascript components in a contained, object-oriented fashion.  While I do this as well for smaller sites I work on, without the vast number of pages that a large Enterprise Application has, it usually isn't very beneficial to create a highly configurable component that can be used in multiple different scenarios and manipulated countless different ways.  Its never bad to create something like that, but the cost of time isn't always worth it for small sites.

A couple of things that I've come to notice that have really helped me create Javascript components that are highly adaptable and easy to re-use in different scenarios are as follows:

+	**Make attributes and parameters configurable through a configuration object.**  I can't count how many times I've written something, thinking its only going to need attribute x and attribute y, so theres no need to stuff them into a configuration object, and shortly after come to realize I also need to add parameter z.  So instead of having a constructor like this:

	```javascript
	function Component(one, two) {
	   this.one = one;
	   this.two = two;
	}
	```

	you can save a lot of frustrations when coming back later and having to update all of your instantiations of that object to add a 3rd parameter by doing the following:

	```javascript
	function SweetComponent(config) {
	   config = config || {};
	   this.one = config.one || null;
	   this.two = config.two || null;
	}
	```

	Theres different ways of creating a constructor to set values from a config object, but thats the general idea, allowing you to add extra attributes without having to go back and fix all of your instantiations.

+	**Provide event hooks**.  Another thing I've come across that I find helpful is providing hooks into different events that the component might perform.  For example, one thing I've used a lot is a row selector component that lets you click a row to select a record.  By using the ```YUI CustomEvent```, and firing off an ```afterToggle``` event when the row has been clicked and selected, it allows other components to tap into that, and perform anything they need without having to manipulate the row selector component at all.  Providing these hooks can be done different ways, and using ```YUI CustomEvents``` is just one of them.  Other frameworks like Dojo offer an advice framework that I think is pretty nice as well, letting you wrap anything you might need.  The disadvantage to this is, as a developer, it requires more intimate knowledge of the Objects and their functions, knowing where to put your advice.  By writing your own custom events, and firing them off in the correct spots, someone can look at your object and see that there are only so many events to connect to, and pick the appropriate one.

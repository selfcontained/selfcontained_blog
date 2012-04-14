A large enterprise sized project I work on uses YUI library extensively, and events are a huge part of the rich front end we're developing.  What you start to learn quickly about UI events, is that dependencies between different events start to get very complicated very fast.  When A depends on B, but B needs to wait for C and D and E to finish, but E needs to wait for F to finish, you have a complex situation on your hands.  Up until recently we were able to rely mostly on just using CustomEvents in YUI to handle this for us.

Where that starts to break down is when you have one event, **A**, that is dependent on multiple other events, **B, C, D**.  You now have to manually keep track of what has fired, and make sure you don't fire that **A** until **B, C and D** have all fired.  With very little code, here is a simple class that can be used in conjunction with YIU CustomEvents.  It will handle the 'book-keeping' of firing what you want when all the events you have designated fire.

```javascript
EventMediator = {

	addActivationRecord : function(record) {
		record = record || {};
		var that = this;
		for(var idx in record.events) {
			var eventRecord = record.events[idx];
			if(eventRecord.event !== null) {
				eventRecord.fired = false;
				eventRecord.event.subscribe(function(scopedEvent) {
					return function(e) {
						scopedEvent.fired = true;
						that.fireActivation(record);
					}
				}(eventRecord));
			}
		}
	},

	fireActivation : function(record) {
		var fired = true;
		for(var idx in record.events) {
			if(record.events[idx].fired === false) {
				fired = false;
				break;
			}
		}
		if(fired === true) {
			record.activate.call(record.scope);
		}
	}

};
```

Using the EventMediator would look something like the following:

```javascript
EventMediator.addActivationRecord({
	events : [
		{ event : myObj.someYUICusomEvent },
		{ event : myObj.anotherYUICusomEvent }
	],
	activate : myObj1.myActivationCallback,
	scope : myObj1
});
```

It's pretty straightforward I think.  You call ```addActivationRecord```, passing in an array of objects, whose 'event' property points to a YUI CustomEvent.  You also provide an _activate_ callback method, and give it a scope in which to call the method.  For my purposes so far this has worked pretty well, although I'm sure it could be built up to be much more robust.  Hope it helps someone out!

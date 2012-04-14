In summary, I want to discuss an alternative approach for developing a rich, dynamic UI using Struts1.  The basic approach is:

+	Java Object to JSON string
+	JSON String consumed by Javascript
+	Manipulate UI, update Javascript model
+	On submit of form serialize Javascript model to JSON string
+	Set value of hidden input to JSON string
+	JSON string to Java Object on server side

Modern web development frameworks have come a long way, in almost every language.  Many of the current popular frameworks have integrated widgets or processes for building rich ajax powered UI's with little hand-rolled code.  This makes developing those applications faster and easier.  Unfortunately, we can't always use the latest and greatest new frameworks as developers.

While working on a J2EE web application that was started over 5 years ago, I've learned a lot about how frameworks have evolved since then.  When this project was started, Struts 1 was very popular, and a proven framework, so was naturally adopted for the front end.  Over time, many things were built to integrate with Struts 1 and provide custom functionality that was required.  This makes it very difficult, and highly improbable that a new front end framework can be swapped in due to the time and money that would have to be invested.  At some point that may be a necessity, but until then, you have to work with what you have.

Building a rich UI using ajax in Struts 1 is ... interesting.  Sruts1 is very form centric, and all of your form inputs in your UI map directly back to some field on your Java form object in one way or another.  This makes it tricky to provide a flexible data structure for a rich UI that may be adding or removing elements.  Try adding/removing elements to your page dynamically, and having them map back to your Struts1 Form in a clean way and you'll see what I'm talking about.  A recent approach I took to tackling this situation was to depend very little on the framework.

Lets say I have a Java object graph I want to load into some front end javascript model to work with in the UI.  I can fetch this asynchronously as the page loads as a JSON payload, or just dump it to the page into the appropriate place so my javascript consumes it.  Either way, I need to make sure its painless to convert this data structure to a JSON string, or create it from a JSON string.  This will make passing it back and forth from the server side to the client side much easier.

I can then use this as my front end data model to display, change, remove and add data.  When I'm ready to commit my changes, I then have to get that back to my server side Java action.  Obviously I could also make the persistence portion asynchronous as well, but sometimes thats problematic, as you may have a lot that goes on in the backend and the rendering of a new page (security, alerts, etc.) that you would have to replicate if you were to do this asynchronously.  To keep everything working as normal, one approach is to take your javascript data graph, and serialize it into a json string and set it into an html hidden input.  This input can be mapped back to your Struts form, so back in your action you have a json string you decode and create the appropriate Java objects from.  I've found this to be a very useful approach when trying to build a very rich UI on top of an older framework.  In summary, here are the steps followed:

+	Build your data as Java objects that can be serialized into JSON, and created from a JSON string.
+	Consume the JSON data into your javascript and work with it as needed in the front end.
+	On submit of the form, serialize the Javascript object into a JSON string and set it onto the value of a hidden input
+	Get the value of the hidden input on the server side as your framework supports, and convert the JSON string back to your Java objects


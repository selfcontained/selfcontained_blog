I was tackling a problem the other day related to triggering ajax requests as a user was typing in an input field.  Sometimes you can just fire off the request on the blur event, but other times you want to fire it off from a keypress event.  Sending xhr requests on every keypress can quickly overload your server and/or database.  More often than not, if a user is typing, you can wait until they are done, or for a pause in their button mashing to send the request.  This saves your server from getting hammered by un-needed requests, but still gives the user the experience desired.

A simple approach to this is wrapping your method that handles the particular ajax request with another simple method that records the time when they key was pressed, and queues up the ajax request method using **setTimeout**.  Here's an example below:

```javascript
Example = {

   interval : 1000,

   lastKeypress : null,

   interceptKeypress : function() {
      this.lastKeypress = new Date().getTime();
      var that = this;
      setTimeout(function() {
         var currentTime = new Date().getTime();
         if(currentTime - that.lastKeypress > that.interval) {
            that.sendRequest();
         }
      }, that.interval + 100);
   },

   sendRequest : function() {
      //Perform xhr request
   }

}
```

The ```Example.interceptKeypress()``` method now becomes what you tie the keyup event of your text input to instead of going straight to the ```Example.sendRequest()``` method.  The current time is recorded, and then ```Example.sendRequest()``` is queued up using ```setTimeout()``` and a closure to handle scoping and ensure that enough time has passed since the last keyup event (100 ms is added to the current time as a buffer).

This approach can easily be added onto existing event handlers if you find you're sending too many requests in particular situations, or for any type of event handling where you want to limit when/how often it is fired.  Hope this benefits some people!

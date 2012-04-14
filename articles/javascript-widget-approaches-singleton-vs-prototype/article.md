Recently I've been doing some work setting up some standard javascript widgets for a web application I am working on.  By widget, I'm referring to items such as javascript date pickers, tooltips, autocomplete inputs, etc.  I'm building on top of YUI for this approach, but the principles I'd like to discuss are applicable to any library.  YUI provides a fantastic javascript library, and a collection of widgets right out of the box.  More than likely, as you add them to your application, you'll want to wrap or extend them in your own javascript implementations to get them functioning as desired.  To accomplish this, I typically have taken one of two approaches, and these are the topics I'd like to cover.  To provide a working example, I'll use a simple wrapper for a YUI Calendar widget that is linked to a text input, and opens by clicking a calendar icon.

![image of a date picker widget][datepicker]

# Prototype approach

This approach basically creates an instance of the javascript widget for each input field, and the javascript widget object utilizes the prototype definition so the internal functions can be defined once in memory.  Below is an example of what a simple DatePicker widget that "wraps" the YUI Calendar widget, would look like:

```javascript
function DatePicker(icon, field) {
    this.icon = icon;
    this.field = field;
    YAHOO.util.Event.addListener(window, 'load', this.initialize, this, true);
}
DatePicker.prototype = {

	icon : null,

	field : null,

	calendar : null,

	id : 'date-calendar',

	container : null,

	initialize : function() {
		YAHOO.util.Event.addListener(this.icon, 'click', this.click, this, true);
		this.renderContainer();
	},

	renderContainer : function() {
		this.container = document.createElement('div');
		this.container.style.display = 'none';
		document.body.appendChild(this.container);
	},

	click : function(e) {
		if(this.calendar === null) {
			this.renderCalendar();
		}
		this.calendar.show();
		this.positionCalendar();
	},

	renderCalendar : function() {
		this.calendar = new YAHOO.widget.Calendar(this.field+'-calendar', this.container, { title:'Choose a date:', close:true, navigator: true } );
		this.calendar.selectEvent.subscribe(this.populateDateField, this, true);
		this.calendar.render();
	},

	positionCalendar : function() {
		var position = YAHOO.util.Dom.getXY(this.field);
		position[1] = position[1] + 25;
		YAHOO.util.Dom.setXY(this.container, position);
	},

	populateDateField : function() {
		var date = this.calendar.getSelectedDates()[0];
		YAHOO.util.Dom.get(this.field).value = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
		this.calendar.hide();
	},

	hide : function() {
		if(this.calendar !== null) {
			this.calendar.hide();
		}
	}

};
```

The html for creating this widget is as simple as follows:

```html
<script type="text/javascript">
	new DatePicker('date-icon', 'date-field');
</script>
<label>Date: </label>
<input type="text" name="date-field" id="date-field" />
<img src="images/calendar.png" id="date-icon" />
```

Some benefits to this approach are that the instance of the widget object has a direct reference to the input id and calendar icon id, and nothing has to be 'inspected' at runtime execution of the events.  This leads to some cleaner code on a small level.  It also has some downsides as we'll discuss below.

# Singleton approach

The Singleton approach creates a 'singleton' wrapper object that creates **ONE** YUI Calendar widget that is re-used across all input fields.  At runtime, the icon clicked on is used to determine which input field is in use through an extra attribute added to the icon image called 'data-field' that contains the id of the input it is linked to.  This code would look as follows:

```javascript
DatePickerSingleton = {

	calendar : null,

	id : 'date-calendar',

	container : 'date-calendar-container',

	activeInput : null,

	initialize : function() {
		var icons = YAHOO.util.Selector.query('.date-icon');
		YAHOO.util.Event.addListener(icons, 'click', this.click, this, true);
		this.renderContainer();
	},

	renderContainer : function() {
		var container = document.createElement('div');
		container.id = this.container;
		container.style.display = 'none';
		document.body.appendChild(container);
	},

	click : function(e) {
		this.activeInput = common.byEvent(e).getAttribute('data-field');
		if(this.calendar === null) {
			this.renderCalendar();
		}
		this.calendar.show();
		this.positionCalendar();
	},

	renderCalendar : function() {
		this.calendar = new YAHOO.widget.Calendar(this.id, this.container, { title:'Choose a date:', close:true, navigator: true } );
		this.calendar.selectEvent.subscribe(this.populateDateField, this, true);
		this.calendar.render();
	},

	positionCalendar : function() {
		var position = YAHOO.util.Dom.getXY(YAHOO.util.Dom.get(this.activeInput));
		position[1] = position[1] + 25;
		YAHOO.util.Dom.setXY(this.container, position);
	},

	populateDateField : function() {
		var date = this.calendar.getSelectedDates()[0];
		YAHOO.util.Dom.get(this.activeInput).value = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
		this.calendar.hide();
	},

	hide : function() {
		if(this.calendar !== null) {
			this.calendar.hide();
		}
	}

};
YAHOO.util.Event.addListener(window, 'load', DatePickerSingleton.initialize, DatePickerSingleton, true);
```

The html for creating this widget is as simple as follows:

```html
<div class="code-highlight"><code>
<label>Date: </label>
<input type="text" id="date_field" />
<img src="images/calendar.png" class="date-icon" data-field="date_field" />
```

# Results

After testing out each of these approaches using a range from 1 to 1000 inputs on a page, I noticed some interesting side effects.  Both approaches load using almost the same amount of resources.  You might think the Prototype approach would require more memory on page load to create each of the widgets for each input, but in reality, due to the prototype definition, the only additional memory needed for each widget is for the unique element id's stored as attributes.  Each approach also uses a 'lazy loading' approach, that causes the Calendar widget to not be created until the user actually clicks on an icon.  This is where the two approaches begin to differ.

The Singleton approach consumes a small amount of additional memory on the first click, as it creates the Calendar widget at this time.  For subsequent clicks the memory stays the same, as the objects have already been created, and are just being re-used.  A downside to this approach is that on page load, a javascript css selector query has to be executed to gather all date picker icons to set up click events for them.  This 'can' be time consuming with a large number of elements (1000+).

The Prototype approach will consume additional memory for each new icon that is clicked, as there is a Calendar widget created lazily for each input at the runtime click event of the icon.  From my simple tests, I saw an increase ranging from 51.2 kb to 358.4 kb for each additional widget instantiated (each new icon clicked).  In contrast to the Singleton approach, on page load there is no css selector query to run in order to attach the click events, as the element ids are already in memory from the instantiation of each 'wrapper' (DatePicker) object.  This saves the possibly heavy css based query, but adds an initialize function for each input to the page load, which can be time consuming as well.

Recently I have been using the Singleton approach for creating widgets where it is possible, as I believe it scales better, and avoids the problem of memory increasing as users go about using the application.  This can be accentuated even further when page life cycle is long such as in the case of single page web applications.  I found this little exercise interesting in my own work, and hope it is informative for some other people out there.  I'd love to hear any comments regarding this from everyone out there.

[datepicker]: /images/datepicker.gif

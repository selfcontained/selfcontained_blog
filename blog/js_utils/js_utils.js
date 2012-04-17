var Functions = Function.prototype,
	Arrays = Array.prototype,
	Strings = String.prototype,
	Numbers = Number.prototype,
	Dates = Date.prototype,
	slice = Arrays.slice;
function Fn() {}


/**
 * Turn an array-like object (e.g. arguments, nodeList) into an actual array
 *
 * Examples:
 * Array.slice(arguments, 1);
 * Array.slice(document.getElementById('example').childNodes);
 * Array.slice(table.rows);
 * Array.slice({ 0: 'hi', 1: 'bye', length: 2 }); // returns: ['hi', 'bye']
 * Array.slice([1,2,3,4], 1); // returns: [2,3,4]
 * Array.slice([1,2,3,4], 1, 2); // returns: [2]
 * Array.slice([1,2,3,4], 1, -1); // returns: [2,3]
 *
 * @param arr {Object} An object with length and index 0 through length-1 properties
 * @param [start] {Number} Index at which to start the slice
 * @param [end] {Number} Extract up to, but not including the item at index "end"
 * @returns {Array} An array
 */
if(!Array.slice)
	Array.slice = function(arr, start, end) {
		return slice.call(arr, start || 0, end === undefined ? arr.length : end);
	};

/**
 * Return an instance of an anonymous function with obj as its prototype
 * See: http://javascript.crockford.com/prototypal.html
 *
 * @param proto {Object} The object to use on the prototype
 * @returns {Instance} An instance
 */
Object.create = function(proto) {
	Fn.prototype = proto;
	return new Fn();
};

/**
 * Get the type of an object
 *
 * Example:
 *		Object.typeOf();				// returns: 'undefined'
 *		Object.typeOf(null);			// returns: 'null'
 *		Object.typeOf('a string');		// returns: 'string'
 *		Object.typeOf(25);				// returns: 'number'
 *		Object.typeOf(true);			// returns: 'boolean'
 *		Object.typeOf(new Date());		// returns: 'date'
 *		Object.typeOf([1,2]);			// returns: 'array'
 *		Object.typeOf({foo:'bar'});		// returns: 'object'
 *		Object.typeOf(/test/);			// returns: 'regexp'
 *		Object.typeOf(function() {});	// returns: 'function'
 *		Object.typeOf(Math);			// returns: 'object'
 *
 * @param obj {Object} The object
 * @returns {String} The type of the object
 */
Object.typeOf = function(obj) {
	var t = typeof obj;
	if(t !== 'object') return t;

	// typeof null == 'object' so check seperately
	if(obj === null) return 'null';

	// typeof new Array|String|Number|Boolean|RegExp == 'object' so check seperately
	switch(obj.constructor) {
		case Array:		return 'array';
		case String:	return 'string';
		case Number:	return 'number';
		case Boolean:	return 'boolean';
		case RegExp:	return 'regexp';
	}
	return 'object';
};

/**
 * Copy all the properties from one object onto another
 *
 * Example:
 *		var a = { name: 'Joe' };
 *		Object.extend(a, { age: 26 }); // returns: a => { name: 'Joe', age: 26 }
 *		Object.extend({}, someObj); // clone someObj
 *
 * @param a {Object} The object we're modifying
 * @param b {Object} The object from which to copy values
 * @param [b2..n] {Object} Additional objects from which to copy values
 * @returns {Object} The updated object
 */
Object.extend = function(a, b /*, [b2..n] */) {
	Array.slice(arguments, 1).forEach(function(b) {
		Object.getOwnPropertyNames(b).forEach(function(p) {
			a[p] = b[p];
		});
	});
	return a;
};
Object.deepExtend = function(a, b /*, [b2..n] */) {
	Array.slice(arguments, 1).forEach(function(b) {
		Object.getOwnPropertyNames(b).forEach(function(p) {
			if(Object.typeOf(b[p]) === 'object') {
				if(Object.typeOf(a[p]) === 'object')
					Object.extend(a[p], b[p]);
				else
					a[p] = Object.extend({}, b[p]);
			} else
				a[p] = b[p];
		});
	});
	return a;
};

/**
 * Fill an object's existing properties from another object
 *
 * Example:
 *		var a = { name: 'Joe', phone: '' };
 *		Object.merge(a, { age: 26, phone: '555-555-5555' }); // returns: a => { name: 'Joe', phone: '555-555-5555' }
 *
 * @param a {Object} The object we're modifying
 * @param b {Object} The object from which to copy values
 * @param [b2..n] {Object} Additional objects from which to copy values
 * @returns {Object} The updated object
 */
Object.merge = function(a, b /*, [b2..n] */) {
	Array.slice(arguments, 1).forEach(function(b) {
		Object.getOwnPropertyNames(b).forEach(function(p) {
			if(a.hasOwnProperty(p)) a[p] = b[p];
		});
	});
	return a;
};
Object.deepMerge = function(a, b /*, [b2..n] */) {
	Array.slice(arguments, 1).forEach(function(b) {
		Object.getOwnPropertyNames(b).forEach(function(p) {
			if(a.hasOwnProperty(p)) {
				if(Object.typeOf(b[p]) === 'object') {
					if(Object.typeOf(a[p]) === 'object')
						Object.extend(a[p], b[p]);
					else
						a[p] = Object.extend({}, b[p]);
				} else
					a[p] = b[p];
			}
		});
	});
	return a;
};

/**
 * Compare two strings.
 *
 * @param a {String} The string to compare to b
 * @param b {String} The string to compare to a
 * @returns {Number} -1, 0, or 1
 */
if(!Strings.localeCompare)
	Strings.localeCompare = function(b) {
		var a = this.toLowerCase();
		b = b.toLowerCase();
		if(a < b) return -1;
		if(a > b) return 1;
		return 0;
	};
if(!String.localeCompare)
	String.localeCompare = function(a, b) {
		return a.localeCompare(b);
	};

/**
 * Trim whitespace from start and end of a string
 *
 * @param str {String} The string to trim
 * @returns {String} The trimmed string
 */
if(!Strings.trim)
	Strings.trim = function() {
		return this.toString().replace(/^\s+|\s+$/g, '');
	};
if(!String.trim)
	String.trim = function(str) {
		return str.trim();
	};

/**
 * Trim whitespace from start of a string
 *
 * @param str {String} The string to trim
 * @returns {String} The trimmed string
 */
if(!Strings.trimLeft)
	Strings.trimLeft = function() {
		return this.toString().replace(/^\s+/, '');
	};
if(!String.trimLeft)
	String.trimLeft = function(str) {
		return str.trimLeft();
	};

/**
 * Trim whitespace from end of a string
 *
 * @param str {String} The string to trim
 * @returns {String} The trimmed string
 */
if(!Strings.trimRight)
	Strings.trimRight = function() {
		return this.toString().replace(/\s+$/, '');
	};
if(!String.trimRight)
	String.trimRight = function(str) {
		return str.trimRight();
	};

/**
 * Repeat a string multiple times
 *
 * @param str {String} The string to repeat
 * @param num {Number} The number of times to repeat
 * @returns {String} The replicated string
 */
if(!String.repeat)
	String.repeat = function(str, num) {
		return (new Array(num + 1)).join(str);
	};
if(!Strings.repeat)
	Strings.repeat = function(num) {
		return String.repeat(this, num);
	};

/**
 * Ensure a string is a certain length by padding the left side
 *
 * Example:
 * 		String.padLeft('10', 4, '0'); // returns: '0010'
 * 		('yo').padLeft(4); // returns: '  yo'
 * 		('yo').padLeft(4, '&nbsp;'); // returns: '&nbsp;&nbsp;yo'
 *
 * @param str {String} The string to pad
 * @param len {Number} The target length for the string
 * @param chr {String} The character to use to pad the string
 * @returns {String} The padded string
 */
if(!String.padLeft)
	String.padLeft = function(str, len, chr) {
		if((len = len - str.length) < 1) return str;
		return (chr || ' ').repeat(len) + str;
	};
if(!Strings.padLeft)
	Strings.padLeft = function(len, chr) {
		return String.padLeft(this, len, chr);
	};

/**
 * Ensure a string is a certain length by padding the right side
 *
 * Example:
 * 		String.padLeft('10', 4, '0'); // returns: '1000'
 * 		('yo').padRight(4); // returns: 'yo  '
 * 		('yo').padRight(4, '&nbsp;'); // returns: 'yo&nbsp;&nbsp;'
 *
 * @param str {String} The string to pad
 * @param len {Number} The target length for the string
 * @param chr {String} The character to use to pad the string
 * @returns {String} The padded string
 */
if(!String.padRight)
	String.padRight = function(str, len, chr) {
		if((len = len - str.length) < 1) return str;
		return str + (chr || ' ').repeat(len);
	};
if(!Strings.padRight)
	Strings.padRight = function(len, chr) {
		return String.padRight(this, len, chr);
	};

/**
 * Injects values into a string
 *
 * Examples:
 * '{.foo}stool'.inject({ foo: 'bar' }); // returns 'barstool'
 * 'div { height: {.0}px; width: {.0}px; padding: {.length}px; }'.inject([10]); // returns 'div { height: 10px; width: 10px; padding: 1px; }'
 * '{.dir}\\{.file}'.inject({ dir: '~', file: 'index.htm' }); // returns '~\index.htm'
 * '{.dir}{\\.file}'.inject({ dir: '~', file: 'index.htm' }); // returns '~{.file}'
 *
 * @param str {String} The string to receive injections
 * @param obj {Object|Array} An object or an array with the values to inject
 * @returns {String} The injected string
 */
if(!String.inject)
	String.inject = function(str, obj) {
		return str.replace(/\{(\\|)\.([^{}]+)\}/g, function(a, b, c) {
			return b ? '{' + a.substr(2) : (c in obj ? obj[c] : a);
		});
	};
if(!Strings.inject)
	Strings.inject = function(obj) {
		return String.inject(this, obj);
	};

	// (function inject(str, obj) {
	// 	return str.replace(/\{(\\|)\.([^{}]+)\}/g, function(a, b, c) {
	// 		try{
	// 			if(c in obj) return obj[c];
	// 			if(b) return '{' + a.substr(2);
	// 			b = c.split('.');
	// 			do {
	// 				c = b.shift();
	// 				if(!(c in obj)) return a;
	// 				obj = obj[c];
	// 				if(b.join('.') in obj) return obj[b.join('.')];
	// 			} while(b.length)
	// 		} catch(e) {}
	// 		return a;
	// 	});
	// }).zaps(String);

/**
 * Take a string and ensure that it is valid for use as an id or className
 *
 * Examples:
 * 'firm'.sanitizeClass(); // returns 'firm'
 * 'firm 3'.sanitizeClass(); // returns 'firm_3'
 * 'firm-id 3'.sanitizeClass(); // returns 'firm-id_3'
 * 'firm.id 3'.sanitizeClass(); // returns 'firm_id_3'
 *
 * @param str {String} The string to sanitize
 * @returns {String} The sanitized className or id
 */
if(!String.sanitizeClass)
	String.sanitizeClass = function(str) {
		return str.replace(/^([^a-z])|[^a-z0-9_\-]/gi, '_$1');
	};
if(!Strings.sanitizeClass)
	Strings.sanitizeClass = function() {
		return String.sanitizeClass(this);
	};

/**
 * Copy a prototyped and static method from Array to String
 */
function a2s(fn) {
	if(!Strings[fn]) Strings[fn] = Arrays[fn];
	if(!String[fn]) String[fn] = Array[fn];
}

/**
 * Call a function once for each item in an array
 *
 * @param star {Array|String} An array or a string to loop through
 * @param fn {Function} The function to call
 * @param ctx {Object} The context in which to execute the function
 * @returns {Array|String} star
 */
if(!Arrays.forEach)
	Arrays.forEach = function(fn, ctx) {
		for(var i = 0, j = this.length; i < j; i++)
			fn.call(ctx, this[i], i, this);
	};
if(!Array.forEach)
	Array.forEach = function(star, fn, ctx) { Arrays.forEach.call(star, fn, ctx); };

a2s('forEach');

/**
 * Generate new array with results of calling a function on each value in an array
 *
 * @param star {Array|String} An array or a string to loop through
 * @param fn {Function} The mapping function
 * @param ctx {Object} The context in which to execute the function
 * @returns {Array} New array of mapped values
 */
if(!Arrays.map)
	Arrays.map = function(fn, ctx) {
		var res = [];
		for(var i = 0, j = this.length; i < j; i++)
			res.push(fn.call(ctx, this[i], i, this));
		return res;
	};
if(!Array.map)
	Array.map = function(star, fn, ctx) { return Arrays.map.call(star, fn, ctx); };

a2s('map');

/**
 * Find the first occurance of a value in an array and return the index
 *
 * @param arr {Array} The array to search
 * @param val {*} The value we're searching for
 * @param start {Number} The index to start searching at
 * @returns {Number} The index of the first match, or -1 if no match
 */
if(!Arrays.indexOf)
	Arrays.indexOf = function(val, start) {
		var len = this.length,
			i = isNaN(start) ? 0 : parseInt(start, 10);
		if(i < 0) i += len;
		for(; i < len; i++)
			if(i in this && this[i] === val) return i;
		return -1;
	};
if(!Array.indexOf)
	Array.indexOf = function(arr, val, start) { return arr.indexOf(val, start); };

/**
 * Find the last occurance of a value in an array and return the index
 *
 * @param arr {Array} The array to search
 * @param val {*} The value we're searching for
 * @param start {Number} The index to start searching at
 * @returns {Number} The index of the first match, or -1 if no match
 */
if(!Arrays.lastIndexOf)
	Arrays.lastIndexOf = function(val, start) {
		var len = this.length,
			i = isNaN(start) || i >= len ? len - 1 : parseInt(start, 10);
		if(i < 0) i += len;
		for(; i > -1; i--)
			if(i in this && this[i] === val) return i;
		return -1;
	};
if(!Array.lastIndexOf)
	Array.lastIndexOf = function(arr, val, start) { return arr.lastIndexOf(val, start); };

/**
 * Create a new array using a test function as a filter
 *
 * Example:
 * 		[1,2,3,4].filter(function(v) { return v % 2; }) // returns: [1,3]
 *
 * @param star {Array|String} The array or string to filter
 * @param fn {Function} The test function
 * @param [ctx] {Object} The context in which to execute the function
 * @returns {Array} New filtered array
 */
if(!Arrays.filter)
	Arrays.filter = function(fn, ctx) {
		return this.reduce(function(res, val, i, arr){
			if(fn.call(ctx, val, i, arr))
				res.push(val);
			return res;
		}, []);
	};
if(!Array.filter)
	Array.filter = function(star, fn, ctx) { return Arrays.filter.call(star, fn, ctx); };

a2s('filter');

/**
 * Run a function on array values (or string chars) while the function returns true
 *
 * @param star {Array|String} The array or string to test
 * @param fn {Function} The test function
 * @param [ctx] {Object} The context in which to execute the function
 * @returns {Boolean} True if the function returns true for every value
 */
if(!Arrays.every)
	Arrays.every = function(fn, ctx) {
		for(var i = 0, j = this.length; i < j; i++)
			if(!fn.call(ctx, this[i], i, this)) return false;
		return true;
	};
if(!Array.every)
	Array.every = function(star, fn, ctx) { return Arrays.every.call(star, fn, ctx); };

a2s('every');

/**
 * Run a function on array values (or string chars) while the function returns something falsy
 *
 * @param star {Array|String} The array or string to test
 * @param fn {Function} The test function
 * @param [ctx] {Object} The context in which to execute the function
 * @returns {Boolean} True if the function returns true for any value
 */
if(!Arrays.some)
	Arrays.some = function(fn, ctx) {
		for(var i = 0, j = this.length; i < j; i++)
			if(fn.call(ctx, this[i], i, this)) return true;
		return false;
	};
if(!Array.some)
	Array.some = function(star, fn, ctx) { return Arrays.some.call(star, fn, ctx); };

a2s('some');

/**
 * Run a function on array values (or string chars) while the function returns something falsy
 *
 * Example:
 * 		[1,2,3,4].filter(function(v) { return v > 2 && v; }) // returns: 3
 * 		[1,2,3,4].filter(function(v) { return v > 5 && v; }) // returns: false
 * 		[1,2,3,4].filter(function(v) { return v > 2 && 'Found it'; }) // returns: 'Found it'
 *
 * @param star {Array|String} The array or string to test
 * @param fn {Function} The test function
 * @param [ctx] {Object} The context in which to execute the function
 * @returns {mixed} The first truthy return value or false if all return values are falsy
 */
if(!Arrays.find)
	Arrays.find = function(fn, ctx) {
		var result;
		for(var i = 0, j = this.length; i < j; i++)
			if(result = fn.call(ctx, this[i], i, this)) return result;
		return false;
	};
if(!Array.find)
	Array.find = function(star, fn, ctx) { return Arrays.find.call(star, fn, ctx); };

a2s('find');

/**
 * Call a function on two values in an array (or chars in a string) at a time to reduce to a single value
 *
 * Example:
 *		// Implement "arraySum"
 * 		function sum(a, b) { return a + b }
 *		[1,2,3,4,5].reduce(sum); // returns: 15
 *		[1,2,3].reduce(sum, 9); // returns: 15
 *		// Implement string reverse
 *		'dlrow olleJ'.reduce(function(a, b) { return b + a; }); // returns: 'Jello world';
 *
 * @param star {Array|String} An array or a string to loop through
 * @param fn {Function} The function to call
 * @param init {Object} The initial value with which to seed the function
 * @returns {Array|String} The remaining value
 */
if(!Arrays.reduce)
	Arrays.reduce = function(fn, init) {
		var i = 0, j = this.length;
		if(init === undefined) init = this[i++];
		for(; i < j; i++)
			init = fn.call(null, init, this[i], i, this);
		return init;
	};
if(!Array.reduce)
	Array.reduce = function(star, fn, init) { return Arrays.reduce.call(star, fn, init); };

a2s('reduce');

/**
 * Call a function on two values in an array (or chars in a string) at a time, from right to left, to reduce to a single value
 *
 * Example:
 *		// Implement "arraySum"
 *		[1,2,3,4,5].reduceRight(function(a, b) { return a + b; }); // returns: 15
 *		// Implement string reverse
 *		'dlrow olleJ'.reduceRight(function(a, b) { return a + b; }); // returns: 'Jello world';
 *
 * @param star {Array|String} An array or a string to loop through
 * @param fn {Function} The function to call
 * @param init {Object} The initial value with which to seed the function
 * @returns {Array|String} The remaining value
 */
if(!Arrays.reduceRight)
	Arrays.reduceRight = function(fn, init) {
		var i = this.length - 1;
		if(init === undefined) init = this[i--];
		for(; i >= 0; i--)
			init = fn.call(null, init, this[i], i, this);
		return init;
	};
if(!Array.reduceRight)
	Array.reduceRight = function(star, fn, init) { return Arrays.reduceRight.call(star, fn, init); };

a2s('reduceRight');

/**
 * Round a number to the nearest integer
 *
 * Example:
 *		(5).round(); // returns: 5
 *		(5.2).round(); // returns: 5
 *		(5.5).round(); // returns: 6
 */
if(!Numbers.round)
	Numbers.round = function() { return Math.round(this); };

/**
 * Get the absolute value of a number
 *
 * Example:
 *		(5).abs(); // returns: 5
 *		(-5).abs(); // returns: 5
 *		(-5.5).abs(); // returns: 5.5
 */
if(!Numbers.abs)
	Numbers.abs = function() { return Math.abs(this); };

/**
 * Restrict a numeric value to a specified range
 *
 * Example:
 *		(15).restrict(0, 10); // returns: 10
 *		(15).restrict(null, 10); // returns: 10
 *		(15).restrict(0); // returns: 15
 *		(-15).restrict(0, 10); // returns: 0
 *		(-15).restrict(null, 10); // returns: -15
 *		(-15).restrict(0); // returns: 0
 *
 * @param num {Number} The number to restrict
 * @param min {Number} The minimum allowed value
 * @param max {Number} The maximum allowed value
 */
if(!Math.restrict)
	Math.restrict = function(num, min, max) {
		return Math.max(min == undefined ? num : min, Math.min(max == undefined ? num : max, num));
	};
if(!Numbers.restrict)
	Numbers.restrict = function(min, max) { return Math.restrict(this, min, max); };

/**
 * Convert a value to a position in a range
 *
 * Example:
 * 		Math.norm(15, 0, 100); // returns: 0.15
 * 		Math.norm(115, 100, 200); // returns: 0.15
 * 		(80).norm(60, 100); // returns: 0.5
 *
 * @param num {Number} The number
 * @param min {number} The bottom of the range
 * @param max {number} The top of the range
 */
if(!Math.norm)
	Math.norm = function(num, min, max) {
		return (num - min) / (max - min);
	};
if(!Numbers.norm)
	Numbers.norm = function(min, max) { return Math.norm(this, min, max); };

/**
 * Convert a position in a range to a value
 *
 * Example:
 * 		Math.lerp(0.15, 0, 100); // returns: 15
 * 		Math.lerp(0.15, 100, 200); // returns: 15
 * 		(0.5).lerp(60, 100); // returns: 80
 *
 * @param num {Number} The position
 * @param min {number} The bottom of the range
 * @param max {number} The top of the range
 */
if(!Math.lerp)
	Math.lerp = function(num, min, max) {
		return (max - min) * num + min;
	};
if(!Numbers.lerp)
	Numbers.lerp = function(min, max) { return Math.lerp(this, min, max); };

/**
 * Map a numeric value from one range into another range
 *
 * Example:
 *		Math.map(20, 0, 100, 0, 1000); // returns: 200;
 *		(20).map(0, 100, 0, 1000); // returns: 200;
 *		(75).map(50, 100, 800, 1000); // returns: 900;
 *
 * @param num {Number} The number to map
 * @param min {Number} The minimum value in the source range
 * @param max {Number} The maximum value in the source range
 * @param destMin {Number} The minimum value in the destination range
 * @param destMax {Number} The maximum value in the destination range
 */
if(!Math.map)
	Math.map = function(num, min, max, destMin, destMax) {
		return Math.lerp(Math.norm(num, min, max), destMin, destMax);
	};
if(!Numbers.map)
	Numbers.map = function(min, max, destMin, destMax) { return Math.map(this, min, max, destMin, destMax); };

/**
 * Returns a random float within a specific range
 *
 * Example:
 * 		Math.randomFloat(0, 10); // example: 8.565741620404701
 * 		(90).randomFloat(100); // example: 93.01731816822698
 *
 * @param min {number} The bottom of the range
 * @param max {number} The top of the range
 */
if(!Math.randomFloat)
	Math.randomFloat = function(min, max) {
		return Math.random().lerp(min, max);
	};
Numbers.randomFloat = function(max) { return Math.randomFloat(this, max); };

/**
 * Returns a random whole number within a specific range
 *
 * Example:
 * 		Math.randomInt(0, 10); // example: 8
 * 		(90).randomInt(100); // example: 93
 *
 * @param min {number} The bottom of the range
 * @param max {number} The top of the range
 */
if(!Math.randomInt)
	Math.randomInt = function(min, max) {
		return Math.floor(Math.random().lerp(Math.ceil(min), Math.floor(max + 1)));
	};
Numbers.randomInt = function(max) { return Math.randomInt(this, max); };

/**
 * Create an array containing a range of NumberP
 *
 * Example:
 *		(0).to(10); // returns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
 *		(0).to(10, 2); // returns: [0, 2, 4, 6, 8];
 *		(10).to(0, 2); // returns: [10, 8, 6, 4, 2];
 *		(0).to(5, 0.5); // returns: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5];
 *
 * @param max {Number} The end of the range
 * @param step {Number} The increment by which to step to the end of the range
 */
if(!Math.range)
	Math.range =  function(min, max, step) {
		if(min === max) return [];

		step = Math.abs(step || 1);

		var hi = min < max ? max : min,
			lo = min > max ? max : min,
			ret = [min];

		if(lo === min) while((lo += step) < hi) ret.push(lo);
		else while((hi -= step) > lo) ret.push(hi);

		return ret;
	};
Numbers.to = function(max, step) { return Math.range(+this, max, step); };

/**
 * Get today's date
 */
if(!Date.today)
	Date.today = function() {
		var d = new Date();
		d.setHours(0,0,0,0);
		return d;
	};

/**
 * Get the name of a function
 *
 * Example:
 * 		function foo(bar) { return bar; }
 * 		Function.getName(foo); // returns 'foo'
 *
 * @param fn {Function} The function
 * @returns The function's name
 */
if(!Function.getName)
	Function.getName = function(fn) {
		return fn.name || fn.toString().match(/function\s+([^\(]+)/)[1] || null;
	};
if(!Functions.getName)
	Functions.getName = function() {
		return Function.getName(this);
	};

/**
 * Bind the context of a function to an object
 *
 * Example:
 *		function notify(defaultMsg, msg) {
 *			alert(this.name + ' says, "' + (msg || defaultMsg) + '"');
 *		}
 *		var talk = notify.setContext({ name: 'John' }, 'Hi');
 *		talk(); // alerts: John says, "Hi"
 *		talk('Bye'); // alerts: John says, "Bye"
 *
 * @param fn {Function} The function that needs a context
 * @param ctx {Object} The context function needs
 * @param [arg1..n] arguments to apply to the function
 * @returns {Function} A function which calls fn in the desired context
 */
Functions.setContext = function(ctx /*, [arg1..n] */) {
	var fn = this,
		args = Array.slice(arguments, 1);
	return function() {
		return fn.apply(ctx, Array.slice(arguments).concat(args));
	};
};
Function.setContext = function(fn, ctx /*, [arg1..n] */) {
	var args = Array.slice(arguments, 2);
	return function() {
		return fn.apply(ctx, Array.slice(arguments).concat(args));
	};

	// return fn.setContext.apply(fn, Array.slice(arguments,1));
};

/**
 * Call a function after a delay
 *
 * Example:
 *		function notify(msg) {
 *			alert(this.name + ' says, "' + msg + '"');
 *		}
 *		// Wait 5 seconds then alert: John says, "Hi"
 *		notify.setTimeout(5000, { name: 'John' }, 'Hi');
 *
 * @param fn {Function} The function
 * @param ms {Number} The time between each call
 * @param [ctx] {Object} The context function needs
 * @param [arg1..n] Arguments to apply to the function
 * @returns {Number} The timeout identifier
 */
Functions.setTimeout = function(ms /*, [ctx, arg1..n] */) {
	return window.setTimeout(this.setContext.apply(this, Array.slice(arguments, 1)), ms);
};
Function.setTimeout = function(fn, ms /*, [ctx, arg1..n] */) {
	return window.setTimeout(fn.setContext.apply(fn, Array.slice(arguments, 2)), ms);

	//return fn.setTimeout.apply(fn, Array.slice(arguments, 1));
};

/**
 * Call a function at specific intervals
 *
 * Example:
 *		function notify(msg) {
 *			alert(this.name + ' says, "' + msg + '"');
 *		}
 *		// Every 5 seconds alert: John says, "Hi"
 *		notify.setInterval(5000, { name: 'John' }, 'Hi');
 *
 * @param fn {Function} The function
 * @param ms {Number} The time between each call
 * @param [ctx] {Object} The context function needs
 * @param [arg1..n] Arguments to apply to the function
 * @returns {Number} The interval identifier
 */
Functions.setInterval = function(ms /*, [ctx, arg1..n] */) {
	return window.setInterval(this.setContext.apply(this, Array.slice(arguments, 1)), ms);
};
Function.setInterval = function(fn, ms /*, [ctx, arg1..n] */) {
	return window.setInterval(fn.setContext.apply(fn, Array.slice(arguments, 2)), ms);

	//return fn.setInterval.apply(fn, Array.slice(arguments, 1));
};

/**
 * Create a function that delays itself if called back-to-back too quickly
 *
 * @param fn {Function} The function
 * @param ms {Number} The time between each call
 * @param [ctx] {Object} The context for the resulting function
 * @returns {Function} The debounced function
 */
Functions.debounce = function(ms, ctx) {
	var fn = this;
	function debounced() {
		var now = (new Date()).getTime(),
			delay = ms - now + debounced.__lastRun;
		if(delay > 0) {
			if(!debounced.__timeout) debounced.__timeout = window.setTimeout(function() {
				debounced.__timeout = 0;
				fn.apply(ctx, arguments);
			}, delay);
		}
		else {
			fn.apply(ctx, arguments);
		}
		debounced.__lastRun = now;
		return ctx;
	}
	debounced.cancel = function() {
		if(debounced.__timeout) window.clearTimeout(debounced.__timeout);
	};
	debounced.immediately = function() {
		debounced.cancel();
		return fn.apply(ctx, arguments);
	};
	return debounced;
};
Function.debounce = function(fn, ms, ctx) {
	return fn.debounce.call(fn, ms, ctx);
};

/**
 * Create a function that waits to execute until there has been a delay in calls
 *
 * @param fn {Function} The function
 * @param ms {Number} Wait for a delay at least this long
 * @param [ctx] {Object} The context for the resulting function
 * @returns {Function} The delayed function
 */
Functions.delay = function(ms, ctx) {
	var fn = this;
	function delayed() {
		delayed.cancel();
		delayed.__timeout = window.setTimeout(function() {
			delayed.__timeout = null;
			fn.apply(ctx, arguments);
		}, ms);
		return ctx;
	}
	delayed.cancel = function() {
		if(delayed.__timeout) window.clearTimeout(delayed.__timeout);
	};
	delayed.immediately = function() {
		delayed.cancel();
		return fn.apply(ctx, arguments);
	};
	return delayed;
};
Function.delay = function(fn, ms, ctx) {
	return fn.delay.call(fn, ms, ctx);
};

/**
 * Allows a function to inherit from multiple objects
 *
 * Example:
 *		function Hobbit(first, last) {
 *			this.first = first;
 *			this.last = last;
 *		}
 *		Hobbit.prototype.update = function(currently) {
 *			alert(this.first + ' ' + this.last + ' is ' + currently + '.');
 *		};
 *
 *		function Baggins(first)	{
 *			Hobbit.call(this, first, 'Baggins');
 *		}
 *		Baggins.inherits(Hobbit, {
 *			travel: function() { this.update('going adventuring'); }
 *		});
 *
 *		var me = new Baggins('Frodo');
 *		me.travel(); // alerts: Frodo Baggins is going adventuring.
 *		me.instanceOf(Baggins);  // => true
 *		me.instanceOf(Hobbit);   // => true
 *		me.inheritsFrom(Hobbit); // => true
 *		Baggins.inheritsFrom(Hobbit); // => true
 *		me.constructor; // => Baggins
 *		me.constructor.supers[0]; // => Hobbit
 *
 * @param obj {Object} The object from which to inherit
 * @param [obj2..n] {Objects} Additional objects from which to inherit (optional)
 */
Functions.inherits = function(/* obj, [obj2..n] */) {
	var proto = this.prototype = this.prototype || {};
	this.supers = Array.slice(arguments);

	proto.inheritsFrom = Functions.inheritsFrom;
	proto.instanceOf = function(fn) { Function.instanceOf(this, fn); };

	this.supers.forEach(function(s) {
		Object.extend(proto, Object.create(s.prototype || s));
	});
};

Functions.inheritsFrom = function(fn) {
	var s = this.constructor && this.constructor.supers || this.supers || [],
		i = s.length;
	while(i--) if(s[i] === fn || inheritsFrom(s[i], fn)) return true;
	return false;
};
Function.inheritsFrom = function(a, b) { return a.inheritsFrom(b); };

/* Subclass.prototype.instanceOf */
Function.instanceOf = function(obj, fn) {
	return obj instanceof fn || obj.inheritsFrom(fn);
};

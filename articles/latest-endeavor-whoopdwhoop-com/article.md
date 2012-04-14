[![][whoopdwhoop-image]][whoopdwhoop]

My wife and I have been chugging away on a new endeavor for awhile, and we finally got to a point where we could launch it live.  In short, it's a currency free, creative marketplace, and it's called [whoopdwhoop.com][whoopdwhoop].  It gives "artisans", or crafty people, a place to list their creations, and hopefully, a community where they can swap their creations with others all without exchanging any currency.  This is facilitated through a pretty simple "whoop" (read point) based system.  As people request a creation from someone, they pay them in "whoops", and then that person can use those "whoops" to request other creations.  We haven't pushed much of a marketing campaign at it yet, in hopes to gauge initial feedback before doing so, and fix or improve whatever came up.  We've done a fair amount of that so far, and are pretty happy with it's current state.  Needless to say, we can't speak to if it will catch on and be the start of a thriving community, we'll have to wait and see.

While I don't think the majority of my blog's reader-base would be interested in using the site itself, I wanted to make a quick post to point out how the development of it has gone, which will hopefully be of more interest to those reading.

I built the site in about 4 or 5 months of actual heads-down, after-hours work.  I have a day job, so this is just something I've spent nights and weekends putting time into.  It's built on [Zend Framework][] MVC, which I absolutely love.  The UI is enhanced through YUI, which is another favorite library of mine.  The database is MySQL, and I'm also using [Doctrine ORM][].

Zend Framework and Doctrine, in my mind, are a great marriage of libraries for PHP.  Zend handles everything I've needed from an MVC, with the additional benefits of providing out-of-the-box API's for things like ACL, Auth, Caching, Emails and Logging.  Doctrine does a great job at providing a stable and solid ORM, and a great means of managing updates through a simple migration strategy.  The best part about finding a solid framework you enjoy working with, is you eventually end up with a great set of features you've built that can be dropped in to any project, giving you quite the head-start.  When I started ( which was actually over a year ago, my motivation comes in spurts), Doctrine 2 was in development, but wasn't where it is now.  I like the concept they've taken with the new version, but currently I'm using their 1.x version.

YUI is being used pretty sparingly right now.  I think the only modules being used currently are containers for the dialogs, buttons, and menu.  I need to give a shout out to the [Minify][] library as well, which is handling the JS/CSS minification quite nicely.

I have some follow-up posts I plan on writing to go into more detail on some of the items and techniques I used in regards to things like Caching, but until I've had more of a chance to put the site through a ringer, I'll hold off.  Anyways, if you're building a new site, looking for frameworks, I highly recommend everything I mentioned above.

[whoopdwhoop-image]: /images/whoopdwhoop.png
[whoopdwhoop]: http://whoopdwhoop.com
[Zend Framework]: http://zendframework.com/
[Doctrine ORM]: http://www.doctrine-project.org/
[Minify]: http://code.google.com/p/minify/

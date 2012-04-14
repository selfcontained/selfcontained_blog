Recently I needed to combine a whole heap of javascript files into a few files for performance reasons.  On this particular project, we have a very large number of custom widgets we've written to extend the awesome YUI library.  Keeping our javascript in small, modularized files is great for development and maintenance, and debugging.  It does however cause issues when the client has to download close to 100 small < 1kb files.  Enter [pack:tag][], an open source jsp tag library for combining javascript and css written by Daniel Galán y Martins.  Its as simple as including a jar, adding the tld and properties files, then using it on your pages.


>	pack:tag is a JSP-Taglib that minifies, compresses and combines resources (like JavaScript and CSS) and caches them in memory or in a generated file. It works transparent to the user/developer and the compressing-algorithms are pluggable.


So far its worked great, and the reduction in the number of files, along with filesize by using the built in minify option has been a huge benefit.  When I need to debug, its as simple as setting an enable flag to false, and I now have all the individual files at my disposal.  If you're developing in Java-land, and need to combine your js/css files, I strongly recommend checking out this great open source tag library.

[pack:tag][]

[pack:tag]: http://www.galan.de/pages/packtag

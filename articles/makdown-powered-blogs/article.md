Switching from a complex blogging platform to a lightweight, file-based blog is something of a trend amongst web developers lately.  I chalk it up to our love of simple solutions, and a preference of interfacing directly with a file-system.  I much prefer to open up [SublimeText2][sublime], go into [distraction free][] mode and create a [markdown][] file for a new article.  For me it's a smaller barrier of entry to writing than logging into Worpress and gathering my thoughts in a ```<textarea>```.

##what's out there

[There][jekyll] [are][wheat] [some][blacksmith] great options out there for markdown based blogs.  My preference is towards [node.js][node], and [Wheat][wheat] (created by [Tim Caswell][creationix]) as a platform for [howtonode.org][howtonode] is one of the more popular solutions in that category.  [Blacksmith][blacksmith] is another great solution, created by [nodejitsu][].  Both are interesting and powerful solutions, but weren't exactly what I wanted.

##javascript is easy

I wanna be in control of the urls for articles, use the templating engine I prefer, and have some fun writing javascript.  I also want to be able to start my blog up locally on a node http server to tweak it and test it, and not have to generate the static site to view every change.  For the live site, I want to just [clone a git repo][blog repo] on a server, and run ```> node generate.js``` to create a static site for Apache to serve.  [So I did][blog repo], it was fun.  Feel free to check it out, maybe [fork][blog repo] it and see what you think.

##i can haz dropbox blog?

[Check out][dropbox publish] what [Joe Hewitt][hewitt] is doing to integrate [Dropbox][] into his blogging solution.  I dig it.

[sublime]: http://www.sublimetext.com/2
[distraction free]: http://www.sublimetext.com/docs/2/distraction_free.html
[markdown]: http://daringfireball.net/projects/markdown/syntax
[jekyll]: https://github.com/mojombo/jekyll
[wheat]: https://github.com/creationix/wheat
[node]: http://nodejs.org
[creationix]: https://github.com/creationix
[howtonode]: http://howtonode.org/
[blacksmith]: https://github.com/flatiron/blacksmith
[nodejitsu]: http://nodejitsu.com/
[blog repo]: https://github.com/selfcontained/selfcontained_blog
[dropbox publish]: http://joehewitt.com/2011/10/03/dropbox-is-my-publish-button
[hewitt]: https://github.com/joehewitt
[Dropbox]: http://dropbox.com

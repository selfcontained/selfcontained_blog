I released a new version of [flipflop][] that has support for configurable urls.  Details are in the [readme file][readme], but in short, when you generate a new flipflop blog, part of the config in the `blog.json` file will now include a section for `routes`.  If you have an existing flipflop blog and want to update to the latest, you can add this section to your `blog.json` config file.

```javascript
"routes": {
	"archive": "/archive",
	"article": "/:year/:month/:day/:slug",
	"error": "/404.html",
	"homepage": "/",
	"feed": "/feed/rss.xml",
	"tag": "/tag/:tag"
}
```

This will allow for customizing the url, such as adding a prefix to your blog:

```javascript
"routes": {
	"archive": "/blog/archive",
	"article": "/blog/:year/:month/:day/:slug",
	"error": "/blog/404.html",
	"homepage": "/blog",
	"feed": "/blog/feed/rss.xml",
	"tag": "/blog/tag/:tag"
}
```

There are a few special things to note with routes:

+ The **article** route requires a `:slug` param.  Available params are:
	+ `:year`
	+ `:month`
	+ `:day`
	+ `:slug` (required)
+ The **tag** route requires a `:tag` param.  Available params are:
	+ `:tag` (required)


[flipflop]: http://github.com/selfcontained/flipflop
[readme]: http://github.com/selfcontained/flipflop/blob/master/README.md#configuring-routes--urls

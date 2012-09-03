In an effort to teach myself a little about [Fabric][], I threw together a script to help publish updates for this blog.  It's stored on [Github][blog.git] and is an auto-generated static site created by [FlipFlop][].

```
from __future__ import with_statement
import re
from fabric.api import run, cd, env

env.hosts = ['selfcontained.us']

def publish():
	with cd('/data/www/selfcontained'):
		run('git pull')
		run('flipflop generate')
	print('changes published')
```

[Fabric]: http://fabfile.org
[blog.git]: http://github.com/bmharris/selfcontained_blog
[FlipFlop]: http://github.com/bmharris/flipflop
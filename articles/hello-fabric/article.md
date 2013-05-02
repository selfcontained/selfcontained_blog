In an effort to teach myself a little about [Fabric][], I threw together a script to help publish updates for this blog.  It's stored on [Github][blog.git] and is an auto-generated static site created by [FlipFlop][].

```python
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

So simple, just a ```fab publish``` and changes are out there.  Sure beats ssh'ing around and doing it manually.  I realize this is a super basic useage of fabric, but I'm a fan.

Here's a few more commands I put together for tagging and deploying tags to a server:

```python
def tag(version=None):
	if version is None:
		version = getNextVersion()
	if(confirm('create new tag (%s)?' % version) is False):
		abort('no tag for u')
	local('git tag -a %s -m "%s"' % (version, version))
	local('git push --tags');
	print('tag %s created' % version)

def deploy(version=None):
	if version is None:
		version = getNextVersion()
	if newVersion(version):
		tag(version)
	if(confirm('Deploy tag "%s" to production?' % version) is False):
		abort('no deploy for u')
	with cd('/path/to/repo'):
		run('git fetch')
		run('git co %s' % version)
		sudo('/etc/init.d/apache2 restart')
	print('tag %s deployed' % version)

def getNextVersion():
	latest = local('git tag | sort -V | tail -1').strip().split('.')
	latest.append(str(int(latest.pop())+1))
	return '.'.join(latest)

def newVersion(version):
	return version not in local('git tag').strip().split('\n')
```

[Fabric]: http://fabfile.org
[blog.git]: http://github.com/selfcontained/selfcontained_blog
[FlipFlop]: http://github.com/selfcontained/flipflop

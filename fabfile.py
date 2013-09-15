from __future__ import with_statement
import re
from fabric.api import run, cd, env

env.hosts = ['bmharris@selfcontained.us']

def publish():
	with cd('/data/www/selfcontained'):
		run('git pull')
		run('npm install')
		run('./node_modules/.bin/flipflop generate')
	print('changes published')

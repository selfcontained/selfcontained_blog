[Time Machine][] is great, but certain things, like the past 10 years of photos of my kids crawling around in diapers, learning to swim, snowboarding, and shoving their faces full of cake, warrant more than just one extra local backup in my mind.  There are lots of cloud storage solutions, but none have been cheep enough for me to really consider using, until [Google Drive][] came out.  *$4.99 a month for 100 GB*, **yes please!**

##iphoto.library.clone() === ftw()

After installing [Google Drive][] and grabbing a cheap 100 GB subscription, I set forth to backup my precious photos.  iPhoto stores it's library in an *app* file, which is really just a folder.  You can put that folder anywhere (it's in ```~\Pictures\iPhoto Library``` by default), so I *could* just move it into my ```~\Google Drive``` folder and call it good.  I don't have that much confidence in Google Drive yet, and would hate myself if I lost all those photos.  Since local hard-drive space is so cheap and plentiful, I decided to copy my ```~\Pictures\iPhoto Library``` folder into my ```~\Google Drive``` folder.  Once that was done, I just needed to keep it synched with my real iPhoto Library folder.

##rescue.add(crontab).add(rsync);

OSX Lion uses *launchd* instead of *cron*, but I'm used to cron, and it's still installed w/ Lion, so I'm gonna use it.  Setting up an hourly [cron][] to [rsync][] any changes to the local Google Drive copy of the iPhoto Library does the trick, and is super simple.  Create a text file, somewhere, like maybe ```~\crontab.txt``` and fill it with this lovely bit of text, adjusting any directories as needed:

```
1 * * * * rsync -lrtuv ~/Pictures/iPhoto\ Library/ ~/Google\ Drive/iPhoto\ Library/
```

On the first minute of every hour, this job will run.  Feel free to adjust as you need, but rsync is fast, and only copies changes, so don't worry too much about running it too often.  The ```-l``` is important, as iPhoto contains a few internal symlinks that are needed for it to function correctly.  If you feel like giving it a test run, just run the following in a terminal:

```
rsync -lrtuv ~/Pictures/iPhoto\ Library/ ~/Google\ Drive/iPhoto\ Library/
```

With that setup, we just need to add our crontab file to the system:

```
crontab ~/crontab.txt
```

Then check to make sure your job is setup:

```
crontab -l
```

That's it, now [Google Drive][] will backup your iPhoto Library, and any updates to the library will be synched locally with the Google Drive copy.  If you get courageous, you can tell iPhoto to load the library in your Google Drive folder as the source by double clicking ```~\Google Drive\iPhoto Library```.  If you do that, be sure to turn off your cron job though!

```
crontab -r
```

Now you can happily ```camera.takePicture(kids.eat(cake))``` and know it's backed up somewhere other than just your home.

[Time Machine]: http://www.apple.com/macosx/apps/#timemachine
[Google Drive]: http://drive.google.com
[cron]: http://en.wikipedia.org/wiki/Cron
[rsync]: http://en.wikipedia.org/wiki/Rsync

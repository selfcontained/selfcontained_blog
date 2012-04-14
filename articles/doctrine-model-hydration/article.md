I was just deep into figuring out what was causing a certain bug and wanted to take the time to share my findings.  When working with [Doctrine][] we were having some scattered issues of models that we had loaded from the database, modified, and then they were getting stomped on by the database again before saving, wiping out all modifications we had made.  In this particular case we changed one attribute of a model, then called save.  Our save triggers some validation that checks quite a few relationships and business rules between them.   Somewhere in that process, a new copy of the model we were trying to save was being hydrated from the database, and overwriting our previous version.  This seemed like pretty odd, and unwanted behavior, especially in our situation.

After digging around Doctrine's documentation and user group a bit, I came across an attribute setting that enables/disables this exact feature, ```Doctrine::ATTR_HYDRATE_OVERWRITE```.   By default this is set to true.  If you hydrate a model from the database, and then somewhere later grab that same model through a reference, or a request to the Doctrine_Table, it will overwrite the model that is currently in memory for that key with a clean one from the database.   Setting this attribute to false was a great fix for us, and ensures our code will run as intended.

```php
$doctrine = Doctrine_Manager::getInstance();
$doctrine->setAttribute( Doctrine::ATTR_HYDRATE_OVERWRITE, false );
```

[Doctrine]: http://doctrine-project.org

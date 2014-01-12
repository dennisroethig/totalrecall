# Total Recall

### Setup:
Make sure you have these installed:

*	[npm](https://npmjs.org/)
*	[bower](http://bower.io/)
*	[Compass](http://compass-style.org/)


##### Install NPM components from /package.json
```
$ npm install
```
##### Install Ruby Gems from /Gemfile
```
$ bundle install --path=gems
```

### Development:

##### Start local development server:
```
$ grunt serve
```

##### Start local development server with distribution version:
```
$ grunt serve:dist
```

##### Build distribution:
```
$ grunt build
```

### Information:

#### Basic:
*	Yeoman & angular-generator we're used for scaffolding
*	Grunt is used as task-runner (adjusted Gruntfile)
*	Bower pulls in frontend dependencies
*	Angular is used for the application itself
*	The application speaks to the provided API ([totalrecall.99cluster.com](http://totalrecall.99cluster.com))
*	Highscores are saved in localStorage
*	[Font Awesome](http://fontawesome.io/) used for memory images
*	[Google fonts](http://www.google.com/fonts/specimen/VT323) used for body font
*	Theme based on Total Recall movie (1990)

#### Possible next steps:
*	Resolving CORS/Safari issue
*	Adding frontend tests
*	Independet backend to allow multiplayer


### Tested browsers and devices:

#### Browsers
*	Chrome (latest)
*	Firefox (latest)
*	Opera Next (latest)
*	Internet Explorer 9
*	Internet Explorer 10
*	Internet Explorer 11

#### Devices
*	iPhone 4 (iOS 7)
*	iPhone 5 (iOS 7)
*	iPad 3 (iOS 7)
*	Nexus 7 (Android 4.4 KitKat)


### Demo:
You can find a fully functional demo at [roethig.it/totalrecall](http://roethig.it/totalrecall)



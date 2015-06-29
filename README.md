## Astro is a command line tool for developers to quickly perform the common tasks that make up a modern workflow or asset pipeline, but doing so from external to the application itself.

Astro aims to eliminate setup time needed when creating or enhancing micro-service modules. Astro provides a framework for incorporating the latest workflow tooling and processes into daily software engineering workflows, and Astro does not require any configuration to be used out of the box.

As workflow tooling and processes change, existing applications will not require task runner updates, new scripts, or additional dependencies to use the latest tools. Never write or change another gulp or grunt or broccoli file!

Currently Astro provides Node.js and front-end development workflow tools:

	+ Style / Syntax Checking
		+ Jshint
		+ JSCS (coming soon)
		+ ESLINT (coming soon)
	+ Testing
		+ Mocha (with chai, sinon and sinon-chai)
	+ Transpiling
		+ Babel (coming soon)
		+ SASS (coming soon)
	+ Transforming
		+ Concat / Minification (coming soon)
		+ Image compression (coming soon)
	+ Building
		+ Docker (coming soon)

### Astro with Docker

Astro was also made to work with applications that run within a Docker container. If your application has a Dockerfile then Astro provides you the option of running all your asset pipeline or workflow tasks from within your application's container.

This, for example, lets you execute your tests from within your application's Docker container, ensuring that your tests are passing in your application's production docker container.

For more information see the "--docker" option section below.

### Installing Astro
```
$ npm install -g astro-cli
```
Astro-cli is responsible for handling commands and running the appropriate astro modules.  This allows for new modules to be created and incorporated seamlessly. Astro ships without any modules by default, all desired modules will be installed when they are requested.

To install modules:

```
$	astro install mocha
```


This commmand will add [astro-mocha](https://www.npmjs.com/package/astro-mocha) to your local astro-cli for use.  Each module will have it's own available options.  See individual module documentation for details on usage options available.

### Using Astro

Once installed, from any project directory you can run:

```
$ cd myProject
myProject$ astro mocha  *astro runs myProject's tests with mocha*
$ cd ../myModule
myModule$ astro mocha 	*astro runs myModule's tests with mocha*
```

myProject and myModule in the above example require no setup other than tests in a '/test' folder.


### Features

#### Watch (--watch)

Astro comes with a built in directory watch mechanism (using [Chokidar](https://www.npmjs.com/package/chokidar)) that can be added to any astro command. To add a watch just add the "--watch" option to any Astro command:

```
$ cd myProject
myProject$ astro mocha --watch
```

Astro will now run the "mocha" command but it will also watch for any changes to "myProject"

#### Docker (--docker)

Execute any astro command from within your application's docker container.  When the --docker option is present, Astro will look for a Dockerfile from within the current working directory.  Astro then builds an image from your application's Dockerfile and executes the provided Astro commands from within that container.

**This feature has three dependencies**

	1.  A Dockerfile located at the current working directory where the astro command is issued.
	2.  A running Docker instance.  For information on running Docker on your development platform see the [Docker Installation Instructions](https://docs.docker.com/installation/) for your OS specific installation instructions.
	3. 	astro-cli must be installed as a local dependency for your specific application.



#### Force (--force)

Astro can install auto install modules that are currently not installed to Astro. Add "--force" to any astro command to force astro to try and install the astro-* module if necessary.

```
$ cd myProject
myProject$ astro mocha --force (will install astro-mocha if necessary)
```

Force is important for utlizing Astro for automated delivery functionality, running astro as part of your deployment procedures.  For more information see "Using Astro for deployment" section below.


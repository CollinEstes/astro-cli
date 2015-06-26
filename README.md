## Astro is a command line tool for developers to quickly perform the common tasks that make up a modern workflow or asset pipeline, but doing so from external to the application itself.

Astro aims to eliminate setup time needed when creating or enhancing micro-service modules. Astro provides a framework for incorporating the latest workflow tooling and processes into daily software engineering workflows.  Astro does not require any configuration to be used out of the box. As workflow tooling and processes change, existing applications will require no task runner updates, no new scripts, and no additional dependencies to use the latest tools.

Never write another gulp or grunt file!



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



### Installing Astro
```
$ npm install -g astro-cli
```
Astro-cli is responsible for executing commands that excute the seperate astro modules.  This allows for new modules to be created and incorporated seamlessly. Astro ships without any modules by default, all desired modules will be installed when they are requested.

To install modules:

```
$ astro install mocha
```


This commmand will add [astro-mocha](https://www.npmjs.com/package/astro-mocha) to your local astro-cli for use.  Each module will have it's own available options.  See individual module documentation for details on usage options available.

### Using Astro

Once installed, from any project directory you can run:

```
$ cd myProject
$myProject astro mocha  *(astro runs myProject's tests with mocha)*
$ cd ../myModule
$myModule astro mocha 	*(astro runs myModule's tests with mocha)*
```

myProject and myModule in the above example require no setup other than tests in a '/test' folder.






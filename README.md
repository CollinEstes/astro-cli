# Astro

## A configure-less web application build tool.

Astro is a convention's based build system/asset pipeline tool for web application development. Never write another gulp or grunt or broccoli file!

Astro provides a framework for incorporating the latest workflow tooling and processes into daily web developer workflows, and Astro does not require any configuration to be used out of the box. As workflow tooling and processes change, existing applications will not require task runner updates, new scripts, or additional dependencies to use the latest tools.

Currently Astro provides Node.js and front-end development workflow tools.  Here are a few examples:

### Style/Syntax Checking
+ [Jshint](https://www.npmjs.com/package/astro-jshint)
+ [JSCS](https://www.npmjs.com/package/astro-jscs)
+ [ESLINT](https://www.npmjs.com/package/astro-eslint)

### Testing
+ [Mocha](https://www.npmjs.com/package/astro-mocha)
+ Tape (coming soon)

### Transpiling
+ [Babel](https://www.npmjs.com/package/astro-babel)
+ [SASS] (https://www.npmjs.com/package/astro-sass)
+ Browserify (coming soon)

### Minifying
+ [Minify] (https://www.npmjs.com/package/astro-minify)

### Transforming
+ Concat / Minification (coming soon)
+ Image compression (coming soon)

### Building
+ Docker (coming soon)


## Astro Modules
Astro modules, by convention, will be named "astro-{moduleName}".

Astro is responsible for handling commands and running the appropriate astro modules.  This allows for new modules to be created and incorporated seamlessly. Astro ships with no modules by default, all desired modules will be installed when they are requested.

Discover [astro modules](https://www.npmjs.com/search?q=astro-)

Each module will have it's own available options.  See individual module documentation for details on usage options available.



## Astro with Docker

Astro was also made to work with applications that run within a Docker container. If your application has a Dockerfile then Astro provides you the option of running all your asset pipeline or workflow tasks from within your application's container.

This, for example, lets you execute your tests from within your application's Docker container, ensuring that your tests are passing in your application's production docker container.

For more information see the "--docker" option section below.

## Installing Astro

```
$ npm install -g astro
```

**It is recommended to that your NPM environment be configured to not require 'sudo' for global installations.**

**If not then 'sudo' will be required when installing astro and when running astro commands for the first time (which performs an npm install of the corresponding astro-module.**

**For more information on configuring NPM to not require 'sudo' see [here](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)**

## Using Astro

Once installed, from any project directory you can run:

```
$ cd /myProject
myProject$ astro mocha
$ cd ../myModule
myModule$ astro mocha
```

myProject and myModule in the above example require no setup other than tests in a '/test' folder.

The first time the 'astro-mocha' commmands is executed by Astro, astro will add [astro-mocha](https://www.npmjs.com/package/astro-mocha) to your local astro for use.


### Using Astro with NPM
For deployment purposes or team development it may be desirable to put astro commands within the 'scripts' section of your package.json file.  Using astro this way requires astro to be installed as a local dev-dependency for your application.

```
$ cd myProject
myProject$ npm install --save-dev astro
```

Then add desired commands to package.json:
```
"scripts": {
    "test": "astro test",
    "build": "astro build"
}
```
*This example uses aliases (which is recommended for use with NPM), for more information on the astro alias feature see below.*




## Features

### Aliases

Astro's provides the ability to alias commands/options or sets of commands/options together into a singular alias.  **Aliases enable you to add to or change commands seamlessly, without updating each application/module's build file or npm scripts**.

For example, lets say you have a alias 'build-client' that runs commands 'sass catmin browserify'.  Then you decide to add babel transpiling to your build-client process to enable es7 development, the alias 'build-client' can be updated to 'sass catmin browserify --babel'.  Now anytime you run build it will transpile your browserified assets with babel.

By default astro ships with [default aliases](https://github.com/CollinEstes/astro-cli/blob/master/aliases.json)

Astro gives you the ability to change or add default aliases,

```
$ astro alias test mocha --chai --sinon --babel
```

The above command will create a new default alias called 'test' that will perform the commands 'mocha' with options "--chai, --sinon, --babel".

For this example then:
```
$ 'astro test' === $ 'astro mocha --chai --sinon --babel'
```

#### App specific aliasing

In some situations it may be necessary to have application specific aliases. For example one project may default 'test' to mocha for testing, another may default to tape.

Astro will first look for in the current working directory first for the aliases configuration.  *(This is the only configuration necessary and it is optional)*

To create application specific aliases, add a "astro.json" file to your application's root directory and astro will use it instead of the global defaults.



### Watch (--watch)

Astro comes with a built in directory watch mechanism (using [Chokidar](https://www.npmjs.com/package/chokidar)) that can be added to any astro command. To add a watch just add the "--watch" option to any Astro command:

```
$ cd myProject
myProject$ astro mocha --watch
```

Astro will now run the "mocha" command but it will also watch for any changes to "myProject"

### Docker (--docker)

Execute any astro command from within your application's docker container.  When the --docker option is present, Astro will look for a Dockerfile from within the current working directory.  Astro then builds an image from your application's Dockerfile and executes the provided Astro commands from within that container.

**This feature has three dependencies**

1.  A Dockerfile located at the current working directory where the astro command is issued.
2.  A running Docker instance.  For information on running Docker on your development platform see the [Docker Installation Instructions](https://docs.docker.com/installation/) for your OS specific installation instructions.
3. 	astro must be installed as a local dev-dependency for your specific application.

# Astro - the space age developer's best friend

## a docker based code style checker, tester, transpiler, transformer, and more.

Astro is a command line tool for developers to quickly perform the common tasks that make up a modern workflow. 

Astro aims to eliminate setup time needed when creating or enhancing micro-service modules. Together Astro and [Astrokit](https://registry.hub.docker.com/u/mikefielden/astrokit/) provide a framework for incorporating the latest workflow tooling and processes into daily software engineering workflows.  Astro does not require any configuration to be used out of the box. As workflow tooling and processes change, existing applications will require no task runner updates or new scrips to use the latest tools.

Astro pulls and executes dockerfiles and assoicated resources to run services within Docker containers.  This lets Astro normalizes the runtime environments so developers can work on any OS and not have to worry about OS specific installation or usages.


Currently Astro provides Node.js and front-end development workflow tools, but future ehacements into other languages is intended.  To help teach Astro new tricks see the [issues](https://github.com/CollinEstes/astro-cli/issues) to create a new request, or even better submit your PR.


### Installing Astro

Astro has two dependencies of the developer's host environment.

  + [Node.js](https://nodejs.org/)
  + [Docker](https://docs.docker.com/) - which currently requires Linux.  

  > OSX and Windows developers can use [boot2docker](http://boot2docker.io/)
  
  After you have those you install astro via NPM
  
  ```
  npm install astro-cli -g
  ```
  
  > *sudo* may be necessary depending on NPM configuration
  

### Astro can do tricks

  + **Javascript Style Checking**
    - JSHINT
    ```
      cd /myApp
      astro jshint
    ```
    - JSCS
    ```
    coming soon...
    ```
    - ESLINT
    ```
    coming soon...
    ```
  + **Javascript Testing**
    - Mocha (w/ Chai and Sinon)
    ```
    cd /myModule
    astro mocha
    ```
    
  + **Javascript Transpiling**
    - Babel
    ```
    cd /myApp
    astro babel
    ```
  








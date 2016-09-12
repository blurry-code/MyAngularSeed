# MyAngularSeed

_This repository is an angular 1.x seed I put together since I often had some sort of trouble using someone else's. Use at your own risk._

**Demo:**
[**http://angular-seed.tobias-philipp.com**](http://angular-seed.tobias-philipp.com)

**Basic feature list:**

 * basic angular project structure, very similar to the structure of an ionic app  
 * gulp file setup to do various tasks
 * Sass is setup
 * angular-material included

**Prerequisites:**
 1. This seed uses both package managers [**npm**](https://nodejs.org/en/) and [**bower**](https://bower.io/). You will need to have both of them installed globally in order to use this seed.
 2. For task building and running this seed uses [**gulp**](http://gulpjs.com/). Gulp also needs to be installed globally.
 3. Once the package managers and gulp are installed download or clone this git repository.
 4. In the root folder (MyAngularSeed) start command prompt (Windows) or terminal (MacOS) and run following commands (this might take a while): 
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```bower install``` 
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```npm install```


**Gulp tasks:**

Open command prompt or terminal and navigate to the root folder of the project (the folder containing gulpfile.j&#8203;s, bower.json and package.json).

| Gulp task | Description |
| --- | --- |
| `gulp` | Parses sass to css and starts local server with livereload. |
| `gulp dist` | Parses sass, combines all css and js (libraries and app-relevant js seperate) and moves all relevant folders to '/dist'  |

**Base Template**

For use-cases where angular and all is an absolute overkill there is now a base template provided. It just got a few basic pages with a bootstrap header, footer and content area. There are also a couple example sub-pages.
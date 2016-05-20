# MyAngularSeed

_This repository is an angular seed I put together since I often had some sort of trouble using someone else's. Use at your own risk._

Basic feature list:

 * basic angular project structure, very similar to the structure of an ionic app  
 * gulp file setup to do various tasks
 * Sass is setup
 * angular-material included

In order to use gulp commands start command prompt or terminal in the root folder of the project. Following gulp tasks can be called:

| Gulp task | Description |
| --- | --- |
| `gulp` | Parses sass to css and starts local server with livereload. |
| `gulp dist` | Parses sass, combines all css and js (libraries and app-relevant js seperate) and moves all relevant folders to '/dist'  |
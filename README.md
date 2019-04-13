# Style Guide for Decoupled Days 2019

### To get started
1. Checkout the repository `git clone git@github.com:joetower/decoupled-days-styleguide.git`
2. Change into (from terminal) the directory of the repository `cd decoupled-days-styleguide`
3. Using `nvm` run `nvm use` to pull in the node version from `.nvmrc`.
4. Run `npm install`
4. Make sure Gulp in installed globally `npm i -g gulp`
5. Run `gulp`
6. Browersync should automatically open `localhost:8000`

### Generating icons
To manage icons we're using `gulp-svg-sprite`.

Adding new SVG icons is as simple as:

1. Add an SVG to the `/img/icons/` directory.
2. Run `gulp sprite-shortcut` to regenerate the sprite or `gulp sprite-page` to regenerate the html reference page.
3. All icons ge generated into a sprite page at `/sprite/sprite.svg`.
4. 
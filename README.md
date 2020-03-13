#### Guide ####
## Yarn https://classic.yarnpkg.com/en/docs/creating-a-project
* Run `yarn help COMMAND` for more information on specific commands - https://yarnpkg.com/en/docs/cli/
``yarn init`` Create new package.json - https://classic.yarnpkg.com/en/docs/cli/init/#toc-yarn-init
``yarn global add sass postcss-cli browser-sync`` - https://classic.yarnpkg.com/en/docs/cli/add

* `yarn install` Install all packages from package.json, then run ``yarn upgrade``
---------------------------
0. `yarn start` or  `gulp start`：It means to run `gulp vendors`, `gulp scss`, `gulp html`
1. `yarn server` or  `gulp server`：It means to run  `gulp vendors`, `gulp scss`, `gulp html` then `gulp watch`
2. `yarn build`：It means to run `gulp build --production`
---------------------------
`gulp vendors`：Output tailwind css, Copy vendors files to src & dist, Inject css & js path to html and output to /src
`gulp scss`：Compile SCSS to CSS and purge & minify css, needed when modify scss
`gulp inject`：Inject path to all html files relative to /src
`gulp css`：Purge & Minify CSS to /dist
`gulp tailwind --production`：Output tailwind css and Purge & Minify to /dist
`gulp html`：Inject path to all html files relative to /src and /dist [NO for different injection in html]
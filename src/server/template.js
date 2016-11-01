/**
 * Template of the webapp.
 */

const getBundlePath = (endpoint) => (
  process.env.QX_ENV === 'development' ?
    'http://localhost:8080/dist/bundle.js' : `${endpoint}/dist/bundle.js`
);

export default (options: Object = {}) => (
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>QX Client</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1">
    <link rel="shortcut icon" href="/favicon.ico">
  </head>
  <body>
    <div id="app"></div>
    <script src="${getBundlePath(options.endpoint)}"></script>
  </body>
</html>
`
);

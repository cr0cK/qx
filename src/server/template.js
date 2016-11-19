/**
 * Template of the webapp.
 */

function getBundlePath(options) {
  return options.development ?
    `${options.endpoint}/webpack` :
    `${options.endpoint}/assets/bundle.js`;
}

export default (options: QXConfig = {}) => (
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>QX Client</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="${options.endpoint}/assets/vue-material.css">
    <link rel="shortcut icon" href="${options.endpoint}/assets/favicon.ico">
  </head>
  <body>
    <div id="app"></div>
    <script src="${getBundlePath(options)}"></script>
  </body>
</html>
`
);

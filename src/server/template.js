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
    <style>
      @font-face {
        font-family: "Roboto-Regular";
        src: url("${options.endpoint}/assets/fonts/Roboto-Regular.ttf");
      }
    </style>
    <link rel="stylesheet" href="${options.endpoint}/assets/styles/vue-material.css">
    <link rel="shortcut icon" href="${options.endpoint}/assets/styles/favicon.ico">
  </head>
  <body>
    <div id="app"></div>
    <script src="${getBundlePath(options)}"></script>
  </body>
</html>
`
);

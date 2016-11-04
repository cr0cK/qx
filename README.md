# QX

Queries eXplorer is a middleware that aims to be a Chrome Network Inspector inside a web page.

## Installation

```bash
npm i @crock/qx
```

```js
import express from 'express';
import qx from '@crock/qx';

const qxRouter = qx({
  endpoint: '/qx',
});

const app = express();
app.use(qxRouter);

app.listen(3000);
```

## How to work on the bundle?

Start the webpack-dev-server and start your app with `QX_ENV=development`.

```bash
cd qx
npm run dev:client

cd /path/to/your/app
QX_ENV=development node yourapp.js
```

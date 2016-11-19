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

Note: In order to intercept all the traffic, always mount QX at the root level and use the `endpoint` option to specify the endpoint of the client.


## Profil

Different profil can be configured according to the intercepted url. For example, if you work with 2 API on two different endpoints, like `/api/shop` and `/api/account`, you can configure QX like that:

```js
const qxRouter = qx({
  endpoint: '/qx',
  profiles: {
    name: 'Shop',
    color: '#fff200',
    urlsPattern: (req) => /^\/api\/shop/.test(req.originalUrl),
    // ...,
  },
});
```

## How to develop on QX?

- Import QX from an absolute path:

```
import QX from '/path/to/QX';
```

- Set the `development` option to true:

```js
const qxRouter = qx({
  endpoint: '/qx',
  development: true,
});
```

- Start webpack-dev-server from QX:

```bash
cd qx
npm run watch:client
```

// @flow

import zlib from 'zlib';

const concatBuffers = localChunks => (
  new Promise((resolve, reject) => {
    try {
      const allBuffers = Buffer.concat(localChunks);
      resolve(allBuffers);
    } catch (err) {
      reject(err);
    }
  })
);

const unzip = (responseHeaders, buffer) => {
  const isGzipEncoded = responseHeaders['content-encoding'] === 'gzip';

  if (!isGzipEncoded) {
    return Promise.resolve(buffer);
  }

  return new Promise((resolve, reject) => {
    zlib.unzip(buffer, (err, decodedBuffer) => {
      if (err) {
        reject(err);
      }
      resolve(decodedBuffer);
    });
  });
};

const decodeToString = buffer => (
  new Promise((resolve, reject) => {
    try {
      resolve(buffer.toString('utf8'));
    } catch (err) {
      reject(err);
    }
  })
);

const encodeToJSON = (responseHeaders, string) => {
  const isJSON = /application\/json/.test(responseHeaders['content-type']);

  if (!isJSON) {
    return Promise.resolve(string);
  }

  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(string));
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Decode the response.
 *  - concat buffers
 *  - unzip if the content is zipped
 *  - decode to string
 *  - encode to JSON if the content-type is JSON
 */
export default (responseHeaders: Object, chunks: Array<Buffer>) => (
  concatBuffers(chunks)
    .then(allBuffers => unzip(responseHeaders, allBuffers))
    .then(unzippedBuffer => decodeToString(unzippedBuffer))
    .then(responseBody => encodeToJSON(responseHeaders, responseBody))
);

const envExports = require('./src/env');
const withImages = require('next-images');

module.exports = withImages(envExports);

experimental: {
  documentMiddleware: true;
}

/* eslint-disable @typescript-eslint/no-var-requires */
const cucumber = require('cypress-cucumber-preprocessor').default;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
};

const logger = require('../utilities/logger');

module.exports = {
  reportError(error, message = '') {
    logger.error(`Error: ${message}`);
    if (error) {
      console.log(error);
    }
    if (error?.response?.data) {
      console.log(JSON.stringify(error.response?.data, null, 2));
    }
  },
};

'use strict';

const getForecast = require('./forecast');
const sendMessage = require('./message');
const {
  processForecast,
  handleError,
  handleSuccess,
} = require('./helpers');

module.exports.run = (event, context, callback) => {
  getForecast()
    .then(processForecast)
    .then(sendMessage)
    .then(message => callback(null, handleSuccess(message)))
    .catch(err => callback(null, handleError(err)));
};
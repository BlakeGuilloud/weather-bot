'use strict';

const getForecast = require('./forecast');
const latitude = process.env.LATITUDE;
const longitude = process.env.LONGITUDE;

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;
const client = require('twilio')(accountSid, authToken);

function processForecast(req) {
  const currently = JSON.parse(req.body).currently;

  const returnVal = `The weather in Greensboro is ${currently.summary} and the temperature is ${currently.temperature}°. Have a wonderful day.`;
  
  return returnVal;
}

function handleSuccess(message) {
  const body = JSON.stringify({
    body: message.body,
    from: message.from,
  });

  return {
    statusCode: 200,
    body,
  }
}

function handleError(err) {
  return {
    statusCode: 500,
    message: 'Something went terribly wrong.'
  }
}

module.exports.run = (event, context, callback) => {
  getForecast(latitude, longitude)
    .then(processForecast)
    .then((forecast) => {
      const body = {
        body: forecast,
        to: '+18438126962',
        from: process.env.FROM_NUMBER,
      };

      client.messages.create(body)
        .then(message => callback(null, handleSuccess(message)))
        .catch(err => callback(null, handleError(err)));
    });
};
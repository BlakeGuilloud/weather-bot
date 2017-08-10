'use strict';

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

module.exports = {
  processForecast,
  handleError,
  handleSuccess,
};

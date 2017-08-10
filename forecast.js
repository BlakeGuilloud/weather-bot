'use strict';

const DarkSky = require('forecast.io');
const latitude = process.env.LATITUDE;
const longitude = process.env.LONGITUDE;
const APIKey = process.env.DARK_SKY_API_KEY;

const client = new DarkSky({ APIKey });

module.exports = () => {
  return new Promise((resolve, reject) => {
    client.get(latitude, longitude, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
'use strict';

const { databaseConnect } = require('../../db');
const { Model } = require('../../db/models');

module.exports.get = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  databaseConnect()
    .then(() => {
      Model.findById(event.pathParameters.id)
        .then(data => callback(null, {
          statusCode: 200,
          body: JSON.stringify(data)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'[GET] Could not fetch the patient.', err})
        }));
    });
};

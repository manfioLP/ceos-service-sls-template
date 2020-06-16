'use strict'

const { databaseConnect } = require('../../db');
const { Model } = require('../../db/models');

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  databaseConnect()
    .then(() => {
      Model.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(data => callback(null, {
          statusCode: 200,
          body: JSON.stringify(data)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'[UPDATE] Could not fetch the data object.', err})
        }));
    });
};

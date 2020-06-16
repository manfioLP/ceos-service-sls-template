'use strict';

const { databaseConnect } = require('../../db');
const { Model } = require('../../db/models');

module.exports.list = (event, context, callback) => {
  // TODO: add filters and pagination
  context.callbackWaitsForEmptyEventLoop = false;

  databaseConnect()
    .then(() => {
      Model.find()
        .then(data => callback(null, {
          statusCode: 200,
          body: JSON.stringify(data)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'[LIST] Could not fetch the data objects.', err})
        }))
    });
};

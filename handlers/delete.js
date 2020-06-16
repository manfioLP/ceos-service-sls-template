'use strict'

const { databaseConnect } = require('../../db');
const { Model } = require('../../db/models');

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  databaseConnect()
    .then(() => {
      Model.findByIdAndRemove(event.pathParameters.id)
        .then(data => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed object with id: ' + data._id, data})
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'[DELETE] Could not fetch the data object.', err})
        }));
    });
};

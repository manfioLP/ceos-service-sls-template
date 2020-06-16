'use strict';

const { databaseConnect } = require('../../db');
const { Model } = require('../../db/models');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  databaseConnect()
    .then(() => {
      Model.create(JSON.parse(event.body))
        .then(data => callback(null, {
          statusCode: 200,
          body: JSON.stringify(data)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'Could not create the object on database.', err})
        }));
    });
};

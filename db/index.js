const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //
// so .thens will work properly on handlers
let isConnected;

// TODO: check need of path module usage
require('dotenv').config({path: path.resolve('.env')});

const connectionString = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PWD}@cluster0-txkes.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const databaseConnect = () => {
  // TODO: verify need of logger usage
  if (!isConnected) {
    console.log('[COLD START] creating new database connection...');
    return mongoose.connect(connectionString)
      .then(db => {
        isConnected = db.connections[0].readyState;
      });
  } else {
    console.log('[WARM START] database is connected already, using previous connection');
    return Promise.resolve();
  }
};

const closeConnection = () => {
  isConnected = false;
  return mongoose.disconnect();
};

module.exports = {
  databaseConnect,
  closeConnection
};

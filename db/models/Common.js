const mongoose = require('mongoose');
// const { errors } = require('../errors');
// TODO: add helper example
// TODO: add constants example
// const { defaultWeekday, defaultMonth } = require('../helper');
// const {educationLevels, genders, weekdays, patientCities, civilStatus} = require('../../constants');

// insert your mongo schema name here
const schemaName = 'Patient';

const schemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

// TODO: verify usage of dates
const CommonSchema = new mongoose.Schema({
  // add properties from schema here
  name: {
    type: String,
    default: 'N/A',
    trim: true
  },
  age: {
    type: Number,
    default: 0
  },
  recordNumber: {
    type: String,
    required: true,
    trim: true
  },
  weekday: {
    type: String,
    enum: weekdays,
    default: defaultWeekday(new Date().getDay()),
    trim: true
  },
  education: {
    type: String,
    enum: educationLevels,
    default: 'N/A',
    trim: true
  },
  educationCompleted: {
    type: Boolean,
  },
  // TODO: remove _id from associatedTraumaInjury
  associatedTraumaInjury: [{
    kind: {
      type: String,
      required: true,
      trim: true
    },
    bone: {
      type: String,
    }
  }],

  // TODO: add reference example
  fractures: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'ExposedFracture'
  }]
}, schemaOptions);
module.exports = mongoose.model(schemaName, CommonSchema);

const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var {ObjectId} = require('mongodb');

const AttendanceSchema = mongoose.Schema({

    day: {
      type: Date
    },

    workingHours: {
      type: Number
    },

    emplolyee: {
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
      type: String,
      minlength: 1,
      trim: true,
      required: true
    }
  },

  status: {
      type: String,
      default: 'Absent'
  }
});

module.exports.Attendance = mongoose.model('Attendance', AttendanceSchema);

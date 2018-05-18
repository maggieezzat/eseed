const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({

    name: {
      type: String,
      minlength: 4
    },

    email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true

   },

    mobileNumber: {
      type: Number
    },

    hireDate: {
        type: Date
    }
});

module.exports.Employee = mongoose.model('Employee', EmployeeSchema);

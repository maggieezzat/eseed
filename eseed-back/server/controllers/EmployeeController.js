const mongoose = require('mongoose'),
  moment = require('moment'),
  Employee = mongoose.model('Employee');

//getting all the regular employees
module.exports.getAllEmployees = async (req, res) => {

  Employee.find().then((emps) => {
      res.send({
          employees: emps
      });
  }).catch((err) => {
      res.status(500).send({ error: err });
  });

};


//deleting an employee
module.exports.deleteEmployee = async (req, res) => {

  Employee.findByIdAndRemove(req.params.employeeId).then((employee) => {
        res.send({employee});
    }).catch((err) => {
        res.status(500).send({ error: err });
    });

  /*  const deletedEmployee = await Product.findOneAndRemove(
    {_id:req.params.employeeId}
    ).exec();
    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ err: null, msg: 'Employee not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Employee was deleted successfully.',
      data: deletedEmployee
    });*/
};

//creating an employee
module.exports.createEmployee = async (req, res) => {

  var e = new Employee({
    name : req.body.name,
    email : req.body.email,
    mobileNumber : req.body.mobileNumber,
    hireDate : req.body.hireDate
  });

  const employee = await Employee.create(e);
  res.status(201).json({
    err: null,
    msg: 'Employee was created successfully.',
    data: employee
  });
};



//editing an employee
module.exports.editEmployee = async (req, res) => {

  const updatedEmployee = await Employee.findOneAndUpdate(
    {_id:req.params.employeeId},
    {
      $set: req.body
    },
    { new: true }
  ).exec();
  if (!updatedEmployee) {
    return res
      .status(404)
      .json({ err: null, msg: 'Employee not found.', data: null });
  }
  res.status(200).json({
    err: null,
    msg: 'Employee was edited successfully.',
    data: updatedEmployee
  });
};

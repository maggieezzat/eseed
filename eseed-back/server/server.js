//*******************************************************
//Many code snippets are taken from a group project for college =)
//*******************************************************
//module imports
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var asyncMiddleware = require('express-async-handler');

//models
var Employee = require('./models/Employee');
var User = require('./models/User');
var Attendance = require('./models/Attendance');

//local files
var {mongoose} = require('./db/mongoose');

//controllers
var AttendanceController = require('./controllers/AttendanceController');
var EmployeeController = require('./controllers/EmployeeController');
var UserController = require('./controllers/UserController');

var authModule = require('./middleware/authenticate');

var app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  })
);

//parsing request bodies
app.use(bodyParser.json());

// User routes
app.post('/register', asyncMiddleware(UserController.createUser));
app.post('/login', asyncMiddleware(UserController.loginUser));
app.post('/logout', asyncMiddleware(UserController.logout));
//app.post('/logout', authModule.authenticate, asyncMiddleware(UserController.logout));


// Employee routes
app.get('/employee/getAllEmployees', asyncMiddleware(EmployeeController.getAllEmployees));
app.post('/employee/createEmployee', asyncMiddleware(EmployeeController.createEmployee));
app.patch('/employee/editEmployee/:employeeId',  asyncMiddleware(EmployeeController.editEmployee));
app.delete('/employee/deleteEmployee/:employeeId', asyncMiddleware(EmployeeController.deleteEmployee));
//app.get('/employee/getAllEmployees', authModule.authenticate, asyncMiddleware(EmployeeController.getAllEmployees));
//app.post('/employee/createEmployee', authModule.authenticate,  asyncMiddleware(EmployeeController.createEmployee));
//app.patch('/employee/editEmployee/:employeeId', authModule.authenticate, asyncMiddleware(EmployeeController.editEmployee));
//app.delete('/employee/deleteEmployee/:employeeId', authModule.authenticate, asyncMiddleware(EmployeeController.deleteEmployee));



const port = 3000;

module.exports.app = app;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

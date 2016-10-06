/* globals console */
"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const session = require('express-session');
const app = express();
app.set('view engine', 'pug');
const Sequelize = require('sequelize');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

global.exp = express;
const connections = require('./config/connections.js');

const mysqlconnection = connections.mysql;
const sequelize = new Sequelize(mysqlconnection.db, mysqlconnection.username, mysqlconnection.password, {
  host: mysqlconnection.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

global.exp.sequelize = sequelize;

global.exp.models = {};
global.exp.associations = {};

require('./api/modules/address/Address.js');
require('./api/modules/users/User.js');
require('./api/modules/projects/Project.js');
require('./api/modules/photos/Photos.js');

let users = require('./api/modules/users/UserController.js');
let projects = require('./api/modules/projects/ProjectController.js');

app.use('/users', users);
app.use('/projects', projects);

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Users☺',
    message: 'This is basic user CRUD using sequelize!☺'
  });
});

const server = app.listen(3001, function() {
  let port = server.address().port;
  console.log('Example app listening on port %s!', port);
});

module.exports = server;

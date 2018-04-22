var mysql = require('mysql');
var config = require('./config');

//mysql connection
var connection = mysql.createConnection({
  host     : '192.185.128.96',
  port     : '3306',
  user     : 'gastscou_george',
  password : 'something',
  database: config.database
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('successfully connected to the database on port: ' + connection.config.port + ' on thread ' + connection.threadId);
});

//exporting database connection to the project
module.exports = connection;
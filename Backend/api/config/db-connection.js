var mysql = require('mysql');
var config = require('./config');

var connection = mysql.createPool(config.database);
connection.getConnection(function() {
  console.log('successfully connected to the database');
});

function handleDisconnect(conn) {
  conn.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      console.log(err.code);
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);
    connection.getConnection(function() {
      console.log('successfully connected to the database');
    });
    handleDisconnect(connection);
  });
}

handleDisconnect(connection);

//exporting database connection to the project
module.exports = connection;

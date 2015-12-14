const winston = require('winston');
const initialize_db = require('./../lib/database').initialize_db;

/*
 Create databases
 Normally would use postgres or similar, but
 for demo purposes and for people to set this
 up locally, i went with level db http://leveldb.org/
 */
initialize_db(['users', 'documents'], (message) => {
  winston.log(message);
  const server = require('./server');
  server.start(() => {
    console.log('Server running at:', server.info.uri);
  });
});

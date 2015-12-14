const appRoot = require('app-root-path');
const level = require('level');

const dbs = {};

/**
 * get
 * @param key {string}
 * @returns {object}
 */
exports.get = (key) => {
  if (!dbs[key]) {
    throw new Error('Database not registered: ' + key);
  }
  return dbs[key];
};

/**
 * register
 * @param key {string}
 * @returns {object}
 */
const register = (key) => {
  if (dbs[key]) {
    throw new Error('Database already registered: ' + key);
  }
  const db_path = `${appRoot.path}/db/${key}`;
  const db = level(db_path, {
    createIfMissing: true,
    valueEncoding: 'json'
  });
  dbs[key] = db;
  return db;
};
exports.register = register;

/**
 * initialize_db
 * @param database_list {array}
 * @param callback {function}
 * @returns {function}
 */
exports.initialize_db = (database_list, callback) => {
  database_list.map(database => register(database));
  return callback('databases created');
};

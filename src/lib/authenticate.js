/*
 Authenticate a user
 This is using a small library called quick-auth-utils I wrote a while back specifically
 for prototyping small projects like this.
 See https://github.com/rtorr/quick-auth-utils
 */
const quickAuthUtils = require('quick-auth-utils');
const conf = require('./conf');
const user_db = require('./database').get('users');
const winston = require('winston');
const Joi = require('joi');
const uuid = require('uuid');

quickAuthUtils.extend({
  SECRET: conf.get('secret'),
  ITERATIONS: 4096,
  KEY_LENGTH: 20,
  DIGEST: 'sha256'
});

const auth_schema = Joi.object().keys({
  username: Joi.string().lowercase().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});
exports.auth_schema = auth_schema;

/**
 * validate
 * @param username {string}
 * @param password {string}
 * @param callback {function}
 */
const validate = (username, password, callback) => {
  Joi.validate({ username: username, password: password }, auth_schema, (joi_err, value) => {
    if (joi_err) {winston.log('error', joi_err);}
    return callback(joi_err, value);
  });
};
exports.validate = validate;

/**
 * create_secure_value
 * @param username {string}
 * @param password {string}
 * @param uid {string}
 * @param password_hash {string}
 * @param callback {function}
 */
const create_secure_value = (username, password, uid, password_hash, callback) => {
  const error = 'could not create secure value';
  const salt = password_hash.split('|')[1];
  quickAuthUtils.makePasswordHash({key: username, password: password, salt: salt}, (new_password_hash) => {
    if (password_hash === new_password_hash) {
      return callback(null, {secure_value: quickAuthUtils.makeSecureValue(uid)});
    }
    return callback(error, null);
  });
};

/**
 * get_user_from_db
 * @param username {string}
 * @param uuid {string}
 * @param password_hash {string}
 * @param callback {function}
 */
const get_user_from_db = (username, _uuid, password_hash, callback) => {
  user_db.get(username, (db_error, db_value) => {
    if (db_error) {
      user_db.put(username, {uid: _uuid, password_hash: password_hash}, (create_user_error, user_created) => {
        if (create_user_error) {
          return callback(create_user_error, user_created);
        }
        user_db.get(username, (_db_err, _db_val) => {
          if (_db_err) {
            return callback(_db_err, _db_val);
          }
          return callback(null, _db_val);
        });
      });
    }else {
      return callback(null, db_value);
    }
  });
};

/**
 * authenticate
 * @param username {string}
 * @param password {string}
 * @param callback {function}
 */
exports.authenticate = (username, password, callback) => {
  const error = 'authenticate failed';
  validate(username, password, (err, value) => {
    if (err) {
      return callback(err, value);
    } else {
      try {
        quickAuthUtils.makePasswordHash({key: value.username, password: value.password}, (password_hash) => {
          get_user_from_db(username, uuid.v4(), password_hash, (get_user_from_db_error, user) => {
            if (get_user_from_db_error) {return callback(error, null);}
            return create_secure_value(username, password, user.uid, user.password_hash, (create_secure_value_error, secure_value) => {
              if (create_secure_value_error) {return callback(error, null);}
              return callback(null, {user: user, secure_value: secure_value});
            });
          });
        });
      } catch (quickAuthUtils_error) {
        winston.log('error', quickAuthUtils_error);
        return callback(error, null);
      }
    }
  });
};

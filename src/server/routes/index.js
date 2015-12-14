const appRoot = require('app-root-path');
const auth = require('./../../lib/authenticate');
const validate = auth.validate;
const authenticate = auth.authenticate;
const Boom = require('boom');
const get_db = require('./../../lib/database').get;

function get_shared_user_object(session) {
  var ctx = {};
  ctx.logged_in = session.get('secure_value') ? true : false;
  ctx.username = session.get('username');
  ctx.uid = session.get('uid');
  return ctx;
}

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      var ctx = {};
      ctx.user = get_shared_user_object(request.session);
      reply.view('index', {
        shared_data: ctx
      });
    }
  },
  {
    method: 'GET',
    path: '/favicon.ico',
    handler: {
      file: `${appRoot.path}/public/favicon.ico`
    }
  },
  {
    path: '/public/{p*}',
    method: 'GET',
    handler: {
      directory: {
        path: `${appRoot.path}/src/public`
      }
    }
  },
  {
    method: 'POST',
    path: '/api/authenticate',
    handler: (request, reply) => {
      const username = request.session.get('username');
      validate(request.payload.username, request.payload.password, (err, value) => {
        if (err) {
          return reply.redirect('/', {
            error: err,
            value: value
          });
        }
        authenticate(value.username, value.password, (authenticate_error, authenticate_object) => {
          if (authenticate_error) {
            return reply(Boom.badImplementation('something went wrong creating a authenticating a user'));
          }
          request.session.set('username', request.payload.username);
          request.session.set('uid', authenticate_object.user.uid);
          request.session.set('secure_value', authenticate_object.secure_value);
          reply({
            username: request.payload.username,
            uid: authenticate_object.user.uid,
            logged_in: true
          }).type('application/json');
        });
      });
    }
  },
  {
    method: 'POST',
    path: '/api/logout',
    handler: (request, reply) => {
      request.session.reset();
      var ctx = {};
      ctx.user = get_shared_user_object(request.session);
      reply(ctx).type('application/json');
    }
  },
  {
    path: '/api/users/{username}',
    method: 'GET',
    handler: function(request, reply) {
      var username = request.params.username ? request.params.username : null;
      var ctx = {
        found: false
      };
      get_db('users').get(username, (err, value) => {
        if (!err) {
          ctx.found = true;
        }
        ctx.username = username;
        ctx.uid = value.uid;
        reply(ctx).type('application/json');
      });

    }
  }
];

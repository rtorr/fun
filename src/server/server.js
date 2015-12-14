const Hapi = require('hapi');
const http = require('http');
const appRoot = require('app-root-path');
const winston = require('winston');
const Hoek = require('hoek');
const vision = require('vision');
const ejs = require('ejs');
const server = new Hapi.Server();
const conf = require('./../lib/conf');
const routes = require('./routes/index');

server.connection({
  host: conf.get('domain'),
  port: conf.get('port')
});

server.ext('onPreResponse', function(request, reply) {

  var response = request.response;

  if (response.isBoom) {
    var error = response;
    var ctx = {};

    var message = error.output.payload.message;
    var statusCode = error.output.statusCode || 500;
    ctx.code = statusCode;
    ctx.httpMessage = http.STATUS_CODES[statusCode].toLowerCase();
    switch (statusCode) {
      case 404:
        ctx.reason = 'page not found';
        break;
      case 403:
        ctx.reason = 'forbidden';
        break;
      case 500:
        ctx.reason = 'something went wrong';
        break;
      default:
        break;
    }

    if (process.env.NODE_ENV === 'dev') {
      winston.log('error', request.path, {error: error.output.payload.error});
    }

    ctx.layout_data = {
      host: conf.get('domain'),
      port: conf.get('webpack_port')
    };

    if (ctx.reason) {
      // Use actual message if supplied
      ctx.reason = message || ctx.reason;
      return reply.view('error', ctx).code(statusCode);
    } else {
      ctx.reason = message.replace(/\s/gi, '+');
      reply.redirect(request.path + '?err=' + ctx.reason);
    }
  }
  return reply.continue();
});

server.register(vision, (err) => {
  Hoek.assert(!err, err);
  server.views({
    engines: {
      html: ejs
    },
    isCached: process.env.NODE_ENV === 'production',
    path: `${appRoot.path}/src/server/templates`,
    compileOptions: {
      pretty: true
    }
  });
});

server.register([{
  register: require('yar'),
  options: {
    cookieOptions: {
      password: conf.get('cookie'),
      isSecure: false,
      clearInvalid: true
    }
  }
}, {
  register: require('hapi-cache-buster'),
  options: new Date().getTime().toString()
}], (err) => {
  if (err) {
    winston.log('error', err);
  }
});

server.register(require('inert'), (err) => {
  Hoek.assert(!err, err);
});

server.route(routes);

module.exports = server;


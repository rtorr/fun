const post_db = require('./database').get('posts');
const Boom = require('boom');
const crypto = require('crypto');
const concat = require('concat-stream');

exports.create = (request, reply) => {
  var time = new Date();
  var uid = request.session.get('uid');
  var username = request.session.get('username');
  var postid = Math.floor(time / 1000) + '-' + crypto.randomBytes(1).toString('hex');

  if (!request.session.get('secure_value')) {
    return reply.redirect('/');
  }

  var post_item = {
    uid: uid,
    username: username,
    created: time.toISOString(),
    title: request.payload.title,
    body: request.payload.body
  };

  var done = (err) => {
    if (err) {
      return reply(Boom.wrap(err, 400));
    }
    reply.redirect('/');
  };

  post_db.put(request.session.get('uid') + '!' + postid, post_item, (err) => {
    if (err) {
      return done(err);
    }
  });

  reply({
    post_title: request.payload.post_title,
    post_body: request.payload.post_body
  }).type('application/json');

};

exports.list_by_username = (request, reply) => {
  var rs = post_db.createReadStream();
  var username = request.session.get('username');
  rs.pipe(concat((posts) => {
    reply({
      posts: posts.filter(post => post.value.username === username)
    }).type('application/json');
  }));
  rs.on('error', (err) => {
    return reply(Boom.wrap(err, 400));
  });
};

exports.list = (request, reply) => {
  var rs = post_db.createReadStream();
  rs.pipe(concat((posts) => {
    reply({
      posts: posts.reverse()
    }).type('application/json');
  }));
  rs.on('error', (err) => {
    return reply(Boom.wrap(err, 400));
  });
};


exports.post = (request, reply) => {
  var done = (err) => {
    if (err) {
      return reply(Boom.wrap(err, 400));
    }
    reply.redirect('/');
  };
  post_db.get(request.params.post_id, (err, data) => {
    if (err) {
      done(err);
    }
    reply(data).type('application/json');
  });
};


exports.edit = (request, reply) => {
  var time = new Date();
  var username = request.session.get('username');
  var done = (err) => {
    if (err) {
      return reply(Boom.wrap(err, 400));
    }
    reply.redirect('/');
  };
  var post_item = {
    uid: request.payload.uid,
    username: username,
    created: time.toISOString(),
    title: request.payload.title,
    body: request.payload.body
  };

  post_db.put(request.params.post_id, post_item, (err) => {
    if (err) {
      done(err);
    }
  });
  reply(post_item).type('application/json');
};

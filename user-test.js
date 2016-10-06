'use strict';
var app = require('./app.js');
var supertest = require('supertest-session');
var should = require('should');

describe('Testing birds APIs', function() {
  it('Get birds details api should return error 401 if login does not exists', function(done) {
    supertest(app)
      .get('/birds/1')
      .expect(401)
      .end(function(err, response) {
        response.status.should.be.equal(401);
        done();
      });
  });

  it('Get bird Details api should return bird details if bird exists', function(done) {
    this.timeout(5000);
    var req = supertest(app);
    req
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'parth'
      })
      .expect(200)
      .end(function(err, response) {
        response.status.should.be.equal(200);
        req
          .get('/birds/57cd744a66497d4ea602f5e5')
          .expect(200)
          .end(function(err, response) {
            response.status.should.be.equal(200);
            done();
          });
      });
  });

  it('Get bird details api should return error 404 if bird does not exists', function(done) {
    var req = supertest(app);
    req
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'parth'
      })
      .expect(200)
      .end(function(err, response) {
        response.status.should.be.equal(200);
        req
          .get('/birds/1')
          .expect(404)
          .end(function(err, response) {
            response.status.should.be.equal(404);
            done();
          });
      });
  })
});

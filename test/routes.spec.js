process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var knex = require('../db/knexfile');

var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function() {

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('Get all shows', function() {
    it('should get all shows', function(done) {
      chai.request(server)
      .get('/api/v1/shows')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('array');
        res.body.length.should.equal(4);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Suits');
        res.body[0].should.have.property('channel');
        res.body[0].channel.should.equal('USA Network');
        res.body[0].should.have.property('genre');
        res.body[0].genre.should.equal('Drama');
        res.body[0].should.have.property('rating');
        res.body[0].rating.should.equal(3);
        res.body[0].should.have.property('explicit');
        res.body[0].explicit.should.equal(false);
        done();
      });
    });
  });

  describe('GET /api/v1/shows/:id', function() {
  it('should return a single show', function(done) {
    chai.request(server)
    .get('/api/v1/shows/1')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.name.should.equal('Suits');
      res.body.should.have.property('channel');
      res.body.channel.should.equal('USA Network');
      res.body.should.have.property('genre');
      res.body.genre.should.equal('Drama');
      res.body.should.have.property('rating');
      res.body.rating.should.equal(3);
      res.body.should.have.property('explicit');
      res.body.explicit.should.equal(false);
      done();
    	});
  	});
	});

  describe('POST /api/v1/shows', function() {
    it('should add a show', function(done) {
      chai.request(server)
      .post('/api/v1/shows')
      .send({
        name: 'Family Guy',
        channel : 'Fox',
        genre: 'Comedy',
        rating: 4,
        explicit: true
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Family Guy');
        res.body.should.have.property('channel');
        res.body.channel.should.equal('Fox');
        res.body.should.have.property('genre');
        res.body.genre.should.equal('Comedy');
        res.body.should.have.property('rating');
        res.body.rating.should.equal(4);
        res.body.should.have.property('explicit');
        res.body.explicit.should.equal(true);
        done();
      });
    });
    });

  describe('PUT /api/v1/shows/:id', function() {
    it('should update a show', function(done) {
      chai.request(server)
      .put('/api/v1/shows/1')
      .send({
        rating: 4,
        explicit: true
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Suits');
        res.body.should.have.property('channel');
        res.body.channel.should.equal('USA Network');
        res.body.should.have.property('genre');
        res.body.genre.should.equal('Drama');
        res.body.should.have.property('rating');
        res.body.rating.should.equal(4);
        res.body.should.have.property('explicit');
        res.body.explicit.should.equal(true);
        done();
      });
    });
  });

});
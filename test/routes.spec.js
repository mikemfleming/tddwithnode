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

});
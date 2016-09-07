var knex = require('./knexfile.js');

function Shows() {
  return knex('shows');
}

// *** queries *** //

function getAll() {
  return Shows().select();
}


module.exports = {
  getAll: getAll
};
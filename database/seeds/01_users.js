exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('users')
      .truncate()
      .then(function() {
        return knex('users').insert([
          { username: 'Pam', password: 'test' },
          { username: 'Cindy', password: 'test' },
          { username: 'Robert', password: 'test' },
          { username: 'Chris', password: 'test' },
        ]);
      });
  };
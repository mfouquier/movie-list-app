/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    { id: 1, title: 'The Matrix', image: 'https://image.tmdb.org/t/p/original/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg' },
    { id: 2, title: 'Caddyshack', image: 'https://image.tmdb.org/t/p/original/21nhVVqGsOrKvkncsB5GbRxpSZh.jpg' },
    { id: 3, title: 'Iron Man', image: 'https://image.tmdb.org/t/p/original/rYy4MShKrZVXhiG4BLqwW1PeSOT.jpg' }
  ]);
};

exports.seed = function(knex, Promise) {
  return knex('tags').insert([
    {id: 0, name: 'important'},
    {id: 1, name: 'work'},
    {id: 2, name: 'school'}
  ]);
};
 
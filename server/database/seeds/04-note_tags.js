exports.seed = function(knex, Promise) {
  return knex('note_tags').insert([
    {id: 0, note_id: 0, tag_id: 0},
    {id: 1, note_id: 0, tag_id: 1},
    {id: 2, note_id: 0, tag_id: 2},
    {id: 3, note_id: 1, tag_id: 2},
    {id: 4, note_id: 1, tag_id: 0}
  ]);
};

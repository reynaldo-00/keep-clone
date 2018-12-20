
exports.up = function(knex, Promise) {
    return knex.schema.createTable('note_tags', table => {
        table.increments('id');
        table.string('note_id')
            .unsigned()
            .references('id')
            .inTable('notes')
            .notNullable();

        table.string('tag_id')
            .unsigned()
            .references('id')
            .inTable('tags')
            .notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('note_tags');
  };
  
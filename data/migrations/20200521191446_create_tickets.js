
exports.up = function(knex) {
    return knex.schema.createTable('tickets', tickets => {
        tickets.increments();
  
        tickets
          .string('category', 255)
          .notNullable()
        //   .unique();
      tickets.string('description', 255).notNullable().unique();
      tickets.string('tried', 255).notNullable();
      tickets.string('comments', 255).notNullable();
        //   tickets.integer('student_id').unique();
        //   tickets.integer('helper_id').unique();
        tickets.integer('student_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        tickets.integer('helper_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        tickets.string('urgency', 255).notNullable();

        tickets.boolean('is_closed');

        tickets.boolean('is_assigned');

        tickets.timestamp('date_created');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tickets');
  };

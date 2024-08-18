exports.up = function(knex) {
    return knex.schema.createTable('USUARIO', (table) => {
      table.increments('CD_USUARIO').primary(); 
      table.string('NM_USUARIO').notNullable();
      table.string('DS_EMAIL').notNullable().unique();
      table.string('DS_SENHA').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('USUARIO');
  };
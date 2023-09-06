exports.up = (knex) =>
  knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();
    table.text("avatar").nullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("user", (table) => {});

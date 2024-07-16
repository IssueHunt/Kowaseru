import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_links', function (table) {
    table.increments('id')
    table.string('name', 50).notNullable()
    table.text('value').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .table('user_links', function (table) {
      table.dropForeign('user_id')
    })
    .dropTable('user_links')
}

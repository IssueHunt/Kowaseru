import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id')
    table.text('content')
    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .table('posts', function (table) {
      table.dropForeign('user_id')
    })
    .dropTable('posts')
}

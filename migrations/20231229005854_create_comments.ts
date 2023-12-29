import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id')
    table.text('content')
    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users').onDelete('cascade')

    table.integer('post_id').unsigned().notNullable()
    table.foreign('post_id').references('id').inTable('posts').onDelete('cascade')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .table('comments', function (table) {
      table.dropForeign('user_id')
      table.dropForeign('post_id')
    })
    .dropTable('comments')
}

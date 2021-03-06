import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('cpf', 15).unique()
      table.string('email').unique().notNullable()
      table.string('name')
      table.string('phone', 20)
      table.string('gender', 1)
      table.string('password').notNullable()
      table.boolean('is_admin').defaultTo(false)
      table.string('remember_me_token').nullable()
      table.timestamp('birthdate', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
    this.schema.dropTable(this.tableName)
  }
}

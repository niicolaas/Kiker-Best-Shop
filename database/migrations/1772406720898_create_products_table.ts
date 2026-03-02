import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    await this.raw('CREATE EXTENSION IF NOT EXISTS vector;')

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.decimal('price')
      table.string('description')
      table.string('imgurl')

      table.specificType('embedding', 'vector(384)')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

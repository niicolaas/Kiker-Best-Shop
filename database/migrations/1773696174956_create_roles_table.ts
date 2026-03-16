import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '../../app/enums/Roles.ts'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table('roles').insert([
        { id: Roles.MEMBER, name: 'Member' },
        { id: Roles.ADMIN, name: 'Admin' },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

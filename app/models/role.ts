import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Roles from '../enums/Roles.ts'

// Extraindo as chaves: 'Member' ou 'Admin'
type RoleName = keyof typeof Roles

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: Roles // Aqui ele já tá tipando o ID com o valor do Enum(1 ou 2)

  @column()
  declare name: RoleName

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

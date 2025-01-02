import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Transaction from './transaction.js'

export default class Budget extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare color: string

  @column()
  declare amount: number

  @column()
  declare startOn: Date

  @hasMany(() => Transaction)
  declare posts: HasMany<typeof Transaction>

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

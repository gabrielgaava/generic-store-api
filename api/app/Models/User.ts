import uuid from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public cpf: string

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public gender: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public birthdate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid.v4()
  }
}

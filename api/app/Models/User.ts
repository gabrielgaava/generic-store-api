import { v4 as uuidv4 } from 'uuid'
import argon2 from 'phc-argon2'
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

  @column({ serializeAs: null })
  public isAdmin: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async assignUuid(user: User) {
    user.id = uuidv4()
    user.password = await argon2.hash(user.password)
  }
}

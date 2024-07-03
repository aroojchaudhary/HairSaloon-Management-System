import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Appointment from './Appointment'
import HairStyle from './HairStyle'
import Review from './Review'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public faceShape: string

  @column()
  public specialization: string

  @column()
  public role: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(customer: User) {
    if (customer.$dirty.password) {
      customer.password = await Hash.make(customer.password)
    }
  }

  @hasMany(() => Appointment)
  public appointments: HasMany<typeof Appointment>

  @hasMany(() => Review)
  public reviews: HasMany<typeof Review>

  @manyToMany(() => HairStyle, {
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'hair_style_id',
    pivotTable: 'saved_hair_styles',
  })
  public hairStyles: ManyToMany<typeof HairStyle>
}

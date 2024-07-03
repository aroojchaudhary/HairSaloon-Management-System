import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class HairStyle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public description: string

  @column()
  public image: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User, {
    pivotForeignKey: 'hair_style_id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'saved_hair_styles',
  })
  public users: ManyToMany<typeof User>
}

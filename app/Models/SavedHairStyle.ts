import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import HairStyle from './HairStyle'

export default class SavedHairStyle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public hairStyleId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: "userId"
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => HairStyle, {
    foreignKey: "hairStyleId"
  })
  public hairStyle: BelongsTo<typeof HairStyle>
}

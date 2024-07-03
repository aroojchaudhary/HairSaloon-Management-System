import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public barberId: number

  @column()
  public status: string

  @column.dateTime()
  public time: DateTime

  @column.date()
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: "userId"
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: "barberId"
  })
  public barber: BelongsTo<typeof User>
}

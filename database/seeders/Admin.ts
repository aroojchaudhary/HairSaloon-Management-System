import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Customer from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await Customer.create({
      name: 'Saloon Manager',
      email: 'style@adonisjs.com',
      password: 'secret@123',
      faceShape: 'round',
      role: 'admin'
    })
  }
}

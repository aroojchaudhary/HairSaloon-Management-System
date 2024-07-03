import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import { Response } from 'App/Utils/ApiUtil';
import UserSignUpValidator from 'App/Validators/UserSignUpValidator';

export default class BarbersController {
    public async store({request, response}: HttpContextContract){
        try {
            const barber = await request.validate(UserSignUpValidator)
            await User.create(barber)
            return response.send(Response({message: 'Baber Profile Created Successfully.'}))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async index({response}: HttpContextContract){
        try {
            const barbers = await User.query().where('role', 'barber')
            const data = barbers.map((barber) => {
                return{
                    id: barber.id,
                    name: barber.name,
                    email: barber.email,
                    role: barber.role,
                    spespecialization: barber.specialization,
                    created_at: barber.createdAt,
                    updated_at: barber.updatedAt
                }
            })
            return response.send(Response(data))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async update({request, params, response}: HttpContextContract){
        try {
            const barber = await User.findOrFail(params.id)
            const data = await request.all()
            await barber.merge(data).save()
            return response.send(Response({message: 'Barber Profile Updated Successfully'}))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async destroy({params, response}: HttpContextContract){
        try {
            const barber = await User.findOrFail(params.id)
            await barber.delete()
            return response.send(Response({message: 'Barber Profile Deleted Successfully'}))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }
}

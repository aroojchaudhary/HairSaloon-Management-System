import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { Response } from 'App/Utils/ApiUtil'
import UserSignUpValidator from 'App/Validators/UserSignUpValidator'
import UserLoginValidator from 'App/Validators/UserLoginValidator'

export default class CustomersController {
    public async signUp({ auth, request, response }: HttpContextContract) {
        try {
            const data = await request.validate(UserSignUpValidator)
            const customer = await Customer.create(data)
            const token = await auth.use('api').generate(customer)
            return response.send(Response({ message: 'Customer SignUp Successfully', token: token }))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async login({ request, response, auth }: HttpContextContract) {
        try {
            const { email, password } = await request.validate(UserLoginValidator)
            const customer = await Customer.findByOrFail('email', email)
            if (!(await Hash.verify(customer.password, password))) {
                return response.status(400).send({ message: 'Invalid phone_number or password' })
            }
            const token = await auth.use('api').generate(customer)
            return response.send(Response({ message: 'User LoggedIn Successfully', token: token }))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async logout({auth, response}:HttpContextContract){
        try {
            await auth.use('api').revoke()
            return response.send(Response({ message: "Customer LogOut Successfully"}))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }
}

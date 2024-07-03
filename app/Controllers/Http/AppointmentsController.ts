import { Response } from 'App/Utils/ApiUtil';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appointment from 'App/Models/Appointment';
import AppointmentValidator from 'App/Validators/AppointmentValidator';

export default class AppointmentsController {
    public async store({ auth, request, response }: HttpContextContract) {
        try {
            const user = auth.user?.id
            const { barber_id, time, date, } = await request.validate(AppointmentValidator)
            let appointment = new Appointment()
            if (user) appointment.userId = user
            appointment.barberId = barber_id
            appointment.time = time
            appointment.date = date
            await appointment.save()
            return response.send(Response({ message: 'Appointment Created Successfully.' }))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async allAppointments({ response }: HttpContextContract) {
        try {
            const appoitments = await Appointment.query()
                .preload('barber').preload('user')
            const data = appoitments.map((appointment) => {
                return {
                    id: appointment.id,
                    barberName: appointment.barber.name,
                    barberEmail: appointment.barber.email,
                    barberSpespecialization: appointment.barber.specialization,
                    customerName: appointment.user.name,
                    customerEmail: appointment.user.email,
                    customerFaceShape: appointment.user.faceShape,
                    time: appointment.time,
                    Date: appointment.date,
                    status: appointment.status,
                    created_at: appointment.createdAt,
                    updated_at: appointment.updatedAt
                }
            })
            return response.send(Response(data))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async customerAppointments({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user?.id
            if (user) {
                const appoitments = await Appointment.query()
                    .where('userId', user).preload('barber')
                const data = appoitments.map((appointment) => {
                    return {
                        id: appointment.id,
                        barberName: appointment.barber.name,
                        barberEmail: appointment.barber.email,
                        barberSpespecialization: appointment.barber.specialization,
                        time: appointment.time,
                        Date: appointment.date,
                        status: appointment.status,
                        created_at: appointment.createdAt,
                        updated_at: appointment.updatedAt
                    }
                })
                return response.send(Response(data))
            }
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async barberAppointments({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user?.id
            if (user) {
                const appoitments = await Appointment.query()
                    .where('barberId', user)
                    .preload('user')
                const data = appoitments.map((appointment) => {
                    return {
                        id: appointment.id,
                        customerName: appointment.user.name,
                        customerEmail: appointment.user.email,
                        customerFaceShape: appointment.user.faceShape,
                        time: appointment.time,
                        Date: appointment.date,
                        status: appointment.status,
                        created_at: appointment.createdAt,
                        updated_at: appointment.updatedAt
                    }
                })
                return response.send(Response(data))
            }
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        try {
            const appointment = await Appointment.findOrFail(params.id)
            const { status } = request.qs()
            await appointment.merge({
                status: status
            }).save()
            return response.send(Response({ message: 'Appointment Status Updated Successfully' }))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }
}

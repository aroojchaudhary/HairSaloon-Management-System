import { Response } from 'App/Utils/ApiUtil';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Review from 'App/Models/Review'

export default class ReviewsController {
    public async store({ auth, request, response }: HttpContextContract) {
        try {
            const user_id = auth.user?.id
            const barber_id = request.input('barber_id')
            const comment = request.input('comment')
            let review = new Review()
            if (user_id) review.userId = user_id
            review.barberId = barber_id
            review.comment = comment
            await review.save()
            return response.send(Response({ message: 'Your Review Created Successfully.' }))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async allReviews({ response }: HttpContextContract) {
        try {
            const reviews = await Review.query()
                .preload('barber').preload('customer')
                console.log(reviews);
                
                const data = reviews.map((review) => {
                    return {
                    id: review.id,
                    barberName: review.barber.name,
                    barberSpespecialization: review.barber.specialization,
                    customerName: review.customer.name,
                    review: review.comment,
                    created_at: review.createdAt,
                    updated_at: review.updatedAt
                }
            })
            return response.send(Response(data))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async customerReviews({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user?.id
            if (user) {
                const reviews = await Review.query()
                    .where('userId', user).preload('barber')
                const data = reviews.map((review) => {
                    return {
                        id: review.id,
                        barberName: review.barber.name,
                        barberSpespecialization: review.barber.specialization,
                        review: review.comment,
                        created_at: review.createdAt,
                        updated_at: review.updatedAt
                    }
                })
                return response.send(Response(data))
            }
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async barberReviews({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user?.id
            if (user) {
                const reviews = await Review.query()
                    .where('barberId', user)
                    .preload('customer')
                const data = reviews.map((review) => {
                    return {
                        id: review.id,
                        customerName: review.customer.name,
                        review: review.comment,
                        created_at: review.createdAt,
                        updated_at: review.updatedAt
                    }
                })
                return response.send(Response(data))
            }
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }
}

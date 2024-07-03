import { Response } from 'App/Utils/ApiUtil';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application';
import SavedHairStyle from 'App/Models/SavedHairStyle';

export default class SavedHairStylesController {
    public async store({ auth, params, response }: HttpContextContract) {
        try {
            const hair_style_id = params.id
            const user_id = auth.user?.id
            let savedHairStyle = new SavedHairStyle()
            if(user_id) savedHairStyle.userId = user_id
            savedHairStyle.hairStyleId = hair_style_id
            await savedHairStyle.save()
            return response.send(Response({ message: 'Your Hair Style Saved Successfully.' }))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async index({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user?.id
            if(user){
                const savedHairStyles = await SavedHairStyle.query()
                .where('userId', user).preload('hairStyle')
                const data = savedHairStyles.map((item) => {
                    return {
                        id: item.id,
                        hairStyleId: item.hairStyle.id,
                        hairStyleName: item.hairStyle.name,
                        hairStyleDescription: item.hairStyle.description,
                        hairStyleImage: Application.tmpPath(`uploads/${item.hairStyle.image}`),
                        created_at: item.createdAt,
                        updated_at: item.updatedAt
                    }
                })
                return response.send(Response(data))
            }
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async destroy({ auth, params, response }: HttpContextContract) {
        try {
            const user = auth.user?.id
            const hairstyle = params.id
            if(user && hairstyle){
                const savedHairStyle = await SavedHairStyle.query()
                .where('userId', user)
                .andWhere('hairStyleId', hairstyle)
                .firstOrFail()
                await savedHairStyle.delete()
                return response.send(Response({ message: 'Hair Style Unsaved Successfully' }))
            }
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }
}

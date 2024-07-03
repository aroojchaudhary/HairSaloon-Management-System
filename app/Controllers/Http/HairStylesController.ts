import { Response } from 'App/Utils/ApiUtil';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application';
import HairStyleValidator from 'App/Validators/HairStyleValidator'
import HairStyle from 'App/Models/HairStyle';
import fs from 'fs/promises'

export default class HairStylesController {
    public async store({ request, response }: HttpContextContract) {
        try {
            const data = await request.validate(HairStyleValidator)
            await data.image.move(Application.tmpPath('uploads'), {
                name: `${Date.now()}-${data.image.clientName}`
            })
            await HairStyle.create({
                name: data.name,
                description: data.description,
                image: data.image.fileName
            })
            return response.send(Response({ message: 'Hair Style Created Successfully' }))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async index({ response }: HttpContextContract) {
        try {
            const hairStyles = await HairStyle.all()
            const data = hairStyles.map((hairStyle) => {
                return {
                    id: hairStyle.id,
                    name: hairStyle.name,
                    description: hairStyle.description,
                    image: Application.tmpPath(`uploads/${hairStyle.image}`),
                    created_at: hairStyle.createdAt,
                    updated_at: hairStyle.updatedAt
                }
            })
            return response.send(Response(data))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const hairstyle = await HairStyle.findOrFail(params.id)
            const data = await request.only(['name', 'description'])
            const image = await request.file('image')
            if(image){
                await image.move(Application.tmpPath('uploads'), {
                    name: `${Date.now()}-${image.clientName}`
                })
                const previousImage = Application.tmpPath(`uploads/${hairstyle.image}`)
                await fs.unlink(previousImage)
                await hairstyle.merge({
                    name: data.name,
                    description: data.description,
                    image: image.fileName
                }).save()
                return response.send(Response({ message: 'Hair Style Updated Successfully' }))
            }
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            const hairStyle = await HairStyle.findOrFail(params.id)
            const image = Application.tmpPath(`uploads/${hairStyle.image}`)
            await fs.unlink(image)
            await hairStyle.delete()
            return response.send(Response({ message: 'Hair Style Deleted Successfully' }))
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }
}

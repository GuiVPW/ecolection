import { HttpRequest, HttpResponse, Controller, CreatePoint } from './createPointProtocols'
import { MissingParamError } from '@presentations/errors'
import { badRequest, ok } from '../../helpers/http-helper'

export class CreatePointController implements Controller {
	constructor(private createPoint: CreatePoint) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requiredFields = ['name', 'email', 'whatsapp', 'latitude', 'longitude', 'items', 'image']

			for (let field of requiredFields) {
				if (!httpRequest.args.data[field]) {
					return badRequest(new MissingParamError(field))
				}
			}

			const { name, email, whatsapp, latitude, longitude, city, uf, items, image } = httpRequest.args.data

			const point = await this.createPoint.create({
				name,
				email,
				image,
				whatsapp,
				latitude,
				longitude,
				city,
				uf,
				items
			})

			return ok({ data: point })
		} catch (error) {
			console.log(error)
			return error
		}
	}
}

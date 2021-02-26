import { HttpRequest, HttpResponse, Controller, GetPoint } from './getPointProtocols'
import { MissingParamError, InvalidParamError } from '@presentations/errors'
import { badRequest, ok } from '@presentations/helpers/http-helper'

export class GetPointController implements Controller {
	constructor(private getPoint: GetPoint) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			if (!httpRequest.args.id) {
				return badRequest(new MissingParamError('id'))
			}

			const { id } = httpRequest.args

			const point = await this.getPoint.get({ id })

			if (!point) {
				return badRequest(new InvalidParamError('id'))
			}

			return ok({ data: point })
		} catch (error) {
			console.log(error)
			return error
		}
	}
}

import { HttpRequest, HttpResponse, Controller, GetItem } from './getItemProtocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class GetItemController implements Controller {
	constructor(private getItem: GetItem) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			if (!httpRequest.args.id) {
				return badRequest(new MissingParamError('id'))
			}

			const { id } = httpRequest.args

			const item = await this.getItem.get(id)

			if (!item) {
				return badRequest(new InvalidParamError('id'))
			}

			return ok({ data: item })
		} catch (error) {
			console.log(error)
			return error
		}
	}
}

import { HttpRequest, HttpResponse, Controller, GetItems } from './getItemsProtocols'
import { ok, serverError } from '@presentations/helpers/http-helper'

export class GetItemsController implements Controller {
	constructor(private getItems: GetItems) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const items = await this.getItems.get()

			return ok({ data: items })
		} catch (error) {
			console.log(error)
			return error
		}
	}
}

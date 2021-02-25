import { notFoundError } from '@presentations/helpers/http-helper'
import { GetItem, ItemModel, ItemRepository } from './dbGetItemProtocols'

export class DbGetItem implements GetItem {
	constructor(private readonly getItemRepository: ItemRepository) {}

	async get(data?: Partial<ItemModel>): Promise<ItemModel> {
		const item = await this.getItemRepository.get(data)

		if (!item) {
			throw notFoundError(new Error('Could not find item with given parameters.'))
		}

		return item
	}
}

import { PORT } from '@main/config'
import { notFoundError } from '@presentations/helpers/http-helper'
import { GetItems, ItemModel, ItemRepository } from './dbGetItemsProtocols'

export class DbGetItems implements GetItems {
	constructor(private readonly getItemsRepository: ItemRepository) {}

	async get(data?: Partial<ItemModel>): Promise<ItemModel[]> {
		const items = await this.getItemsRepository.getMany(data)

		if (!items) {
			throw notFoundError(new Error('Could not find items with given parameters.'))
		}

		const serializedItems = items.map(({ image, ...itemParams }) => ({
			...itemParams,
			image: `http://localhost:${PORT}/static/${image}`
		}))

		return serializedItems
	}
}

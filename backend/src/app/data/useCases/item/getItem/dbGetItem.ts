import { notFoundError } from '@presentations/helpers/http-helper'
import { GetItem, ItemModel, ItemRepository } from './dbGetItemProtocols'
import { PORT } from '@main/config/constants/envs'

export class DbGetItem implements GetItem {
	constructor(private readonly getItemRepository: ItemRepository) {}

	async get(data?: Partial<ItemModel>): Promise<ItemModel> {
		const { image, ...item } = await this.getItemRepository.get(data)

		if (!item) {
			throw notFoundError(new Error('Could not find item with given parameters.'))
		}

		const serializeItem = {
			...item,
			image: `http://localhost:${PORT}/static/${image}`
		}

		return serializeItem
	}
}

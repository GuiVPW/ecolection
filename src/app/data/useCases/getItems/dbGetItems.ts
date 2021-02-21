import { GetItems, ItemModel, GetItemRepository } from './dbGetItemsProtocols'

export class DbGetItems implements GetItems {
	constructor(private readonly getItemsRepository: GetItemRepository) {}

	async get(): Promise<ItemModel[]> {
		const items = await this.getItemsRepository.getMany()

		return items
	}
}

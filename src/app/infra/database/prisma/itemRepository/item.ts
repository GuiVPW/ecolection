import { GetItemRepository } from '@data/protocols/itemRepository'
import { ItemModel } from '@domain/models/item'
import { PrismaHelper } from '../helpers/prismaHelper'

export class ItemPrismaRepository implements GetItemRepository {
	async get(id: string): Promise<ItemModel> {
		const result = await PrismaHelper.findOneItem({
			where: {
				id
			}
		})

		return result
	}

	async getMany(): Promise<ItemModel[]> {
		const result = await PrismaHelper.findManyItems()

		return result
	}
}

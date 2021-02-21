import { GetItemRepository } from '@data/protocols/getItemRepository'
import { ItemModel } from '@domain/models/item'
import { PrismaHelper } from '../helpers/prismaHelper'

export class ItemPrismaRepository implements GetItemRepository {
	async get(id: string): Promise<ItemModel> {
		const result = await PrismaHelper.findOneItem({ id })

		return result
	}
}

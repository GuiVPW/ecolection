import { ItemRepository } from '@data/protocols/itemRepository'
import { ItemModel } from '@domain/models/item'
import { PrismaHelper } from '../helpers/prismaHelper'

export class ItemPrismaRepository implements ItemRepository {
	async add(data: Omit<ItemModel, 'id'>): Promise<ItemModel> {
		const result = await PrismaHelper.createItem(data)

		return result
	}

	async get(data?: Partial<ItemModel>): Promise<ItemModel> {
		const result = await PrismaHelper.findOneItem({
			where: data,
			include: {
				PointItems: true
			}
		})

		return result
	}

	async getMany(): Promise<ItemModel[]> {
		const result = await PrismaHelper.findManyItems()

		return result
	}
}

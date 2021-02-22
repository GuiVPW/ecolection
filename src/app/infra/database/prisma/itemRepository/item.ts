import { GetItemRepository } from '@data/protocols/itemRepository'
import { ItemModel } from '@domain/models/item'
import { notFoundError } from '@presentations/helpers/http-helper'
import { PrismaHelper } from '../helpers/prismaHelper'

export class ItemPrismaRepository implements GetItemRepository {
	async get(id: string): Promise<ItemModel> {
		const result = await PrismaHelper.findOneItem({
			where: {
				id
			}
		})

		if (!result) {
			throw notFoundError(new Error(`Could not find item with id '${id}'`))
		}

		return result
	}

	async getMany(): Promise<ItemModel[]> {
		const result = await PrismaHelper.findManyItems()

		return result
	}
}

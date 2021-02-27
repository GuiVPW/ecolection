import { ItemRepository } from '@data/protocols/itemRepository'
import { ItemModel } from '@domain/models/item'
import { PrismaHelper } from '../helpers/prismaHelper'

export class ItemPrismaRepository implements ItemRepository {
	async create(data: Omit<ItemModel, 'id'>): Promise<ItemModel> {
		const result = await PrismaHelper.create<'Item'>({ data }, 'Item')

		return result
	}

	async get(data?: Partial<ItemModel>): Promise<ItemModel> {
		const result = await PrismaHelper.findOne<'Item'>('Item', {
			where: data
		})

		return result
	}

	async getMany(): Promise<ItemModel[]> {
		const result = await PrismaHelper.findMany<'Item'>('Item')

		return result
	}

	async deleteMany(): Promise<boolean> {
		const result = await PrismaHelper.deleteMany<'Item'>('Item')

		if (!result) {
			return false
		}

		return true
	}
}

import { ItemModel } from '@domain/models/item'

export interface ItemRepository {
	add?(data: Omit<ItemModel, 'id'>): Promise<ItemModel>
	get?(data: Partial<ItemModel>): Promise<ItemModel>
	getMany?(data: Partial<ItemModel>): Promise<ItemModel[]>
}

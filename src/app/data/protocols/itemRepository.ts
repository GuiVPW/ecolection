import { ItemModel } from '@domain/models/item'

export interface GetItemRepository {
	get(id: string): Promise<ItemModel>
	getMany(): Promise<ItemModel[]>
}

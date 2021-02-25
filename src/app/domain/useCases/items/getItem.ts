import { ItemModel } from '@domain/models/item'

export interface GetItem {
	get(data: Partial<ItemModel>): Promise<ItemModel>
}

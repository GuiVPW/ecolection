import { ItemModel } from '@domain/models/item'

export interface GetItem {
	get(id: string): Promise<ItemModel>
}

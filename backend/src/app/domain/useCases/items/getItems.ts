import { ItemModel } from '@domain/models/item'

export interface GetItems {
	get(data?: Partial<ItemModel>): Promise<ItemModel[]>
}

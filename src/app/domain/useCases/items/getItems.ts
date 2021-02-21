import { ItemModel } from '@domain/models/item'

export interface GetItems {
	get(): Promise<ItemModel[]>
}

import { ItemModel } from '@domain/models/item'

export interface AddItem {
	add(data: ItemModel): Promise<ItemModel>
}

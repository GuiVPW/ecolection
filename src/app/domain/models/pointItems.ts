import { ItemModel } from './item'
import { PointModel } from './point'

export interface PointItemsModel {
	id?: string
	pointsId: string
	itemsId: string
	items?: ItemModel
	points?: Omit<PointModel, 'items'>
}

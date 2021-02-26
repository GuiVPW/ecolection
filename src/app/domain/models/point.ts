import { ItemModel } from './item'

export interface PointModel {
	id?: string
	image: string
	name: string
	email: string
	whatsapp: string
	latitude: string
	longitude: string
	city: string
	uf: string
	items: ItemModel[]
}

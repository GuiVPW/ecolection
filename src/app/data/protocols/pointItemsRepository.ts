import { PointItemsModel } from '@domain/models/pointItems'

export interface PointItemsRepository {
	create?(data: Omit<PointItemsModel, 'id'>): Promise<Omit<PointItemsModel, 'pointsId' | 'itemsId'>>
	deleteMany?(): Promise<boolean>
}

import { PointModel } from '@domain/models/point'

export interface CreatePoint {
	create(data: Omit<PointModel, 'id'>): Promise<Omit<PointModel, 'items'>>
}

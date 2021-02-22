import { PointModel } from '@domain/models/point'

export interface PointRepository {
	create(data: Omit<PointModel, 'id'>): Promise<Omit<PointModel, 'items'>>
	get(id: string): Promise<PointModel>
}

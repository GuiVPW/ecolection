import { PointModel } from '@domain/models/point'

export interface PointRepository {
	create(data: Omit<PointModel, 'id' | 'items'> & { items: string[] }): Promise<Omit<PointModel, 'items'>>
	get(id: string): Promise<PointModel>
}

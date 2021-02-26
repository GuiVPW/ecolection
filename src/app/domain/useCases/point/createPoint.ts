import { PointModel } from '@domain/models/point'

export interface CreatePoint {
	create(data: Omit<PointModel, 'id' | 'items'> & { items: string[] }): Promise<Omit<PointModel, 'items'>>
}

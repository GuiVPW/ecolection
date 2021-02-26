import { PointModel } from '@domain/models/point'

export interface GetPoint {
	get(params?: Partial<Omit<PointModel, 'items'>>): Promise<PointModel>
}

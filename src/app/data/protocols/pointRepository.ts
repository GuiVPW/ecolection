import { PointModel } from '@domain/models/point'

export interface PointRepository {
	create(data: Omit<PointModel, 'id' | 'items'>): Promise<Omit<PointModel, 'items'>>
	get(data?: Partial<PointModel>): Promise<PointModel>
	deleteMany(): Promise<boolean>
}

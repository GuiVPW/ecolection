import { PointModel } from '@domain/models/point'

export interface GetPoint {
	get(id: string): Promise<PointModel>
}

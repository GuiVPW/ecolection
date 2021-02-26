import { PointRepository } from '@data/protocols/pointRepository'
import { PointModel } from '@domain/models/point'
import { PrismaHelper } from '../helpers/prismaHelper'

type CreatePoint = Omit<PointModel, 'items'>
export class PointPrismaRepository implements PointRepository {
	async create(data: Omit<PointModel, 'id' | 'items'>): Promise<CreatePoint> {
		const result = await PrismaHelper.create('Point', data)

		return result
	}
}

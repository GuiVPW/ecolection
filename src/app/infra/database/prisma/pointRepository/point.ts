import { PointRepository } from '@data/protocols/pointRepository'
import { PointModel } from '@domain/models/point'
import { PrismaHelper } from '../helpers/prismaHelper'

export class PointPrismaRepository implements PointRepository {
	async create(data: Omit<PointModel, 'id' | 'items'>): Promise<Omit<PointModel, 'items'>> {
		const result = await PrismaHelper.create<'Point'>({ data }, 'Point')

		return result
	}

	async get(data?: Partial<PointModel>): Promise<PointModel> {
		const getPoints = await PrismaHelper.findOne<'Point'>('Point', {
			where: data,
			include: {
				PointItems: {
					include: {
						items: true
					}
				}
			}
		})

		const { PointItems, ...pointWithoutItems } = getPoints

		const items = PointItems.map(({ items }) => items)

		const result = {
			...pointWithoutItems,
			items
		}

		return result
	}

	async deleteMany(): Promise<boolean> {
		const deleteManyPoints = await PrismaHelper.deleteMany<'Point'>('Point')

		if (!deleteManyPoints) {
			return false
		}

		return true
	}
}

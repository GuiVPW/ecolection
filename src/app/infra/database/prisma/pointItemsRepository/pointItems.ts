import { PointItemsRepository } from '@data/protocols/pointItemsRepository'
import { PointItemsModel } from '@domain/models/pointItems'
import { PrismaHelper } from '../helpers/prismaHelper'

export class PointItemsPrismaRepository implements PointItemsRepository {
	async create(data: Omit<PointItemsModel, 'id'>): Promise<Omit<PointItemsModel, 'pointsId' | 'itemsId'>> {
		const result = await PrismaHelper.create<'PointItems'>(
			{
				data: {
					items: {
						connect: {
							id: data.itemsId
						}
					},
					point: {
						connect: {
							id: data.pointsId
						}
					}
				},
				include: {
					items: true,
					point: true
				}
			},
			'PointItems'
		)

		return result
	}

	async deleteMany(): Promise<boolean> {
		const result = await PrismaHelper.deleteMany<'PointItems'>('PointItems')

		if (!result) {
			return false
		}

		return true
	}
}

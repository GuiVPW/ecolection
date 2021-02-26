import { PointRepository } from '@data/protocols/pointRepository'
import { ItemModel } from '@domain/models/item'
import { PointModel } from '@domain/models/point'
import { PointItemsModel } from '@domain/models/pointItems'
import { PrismaHelper } from '../helpers/prismaHelper'

type CreatePoint = Omit<PointModel, 'items'>
export class PointPrismaRepository implements PointRepository {
	async create(data: Omit<PointModel, 'id' | 'items'>): Promise<CreatePoint> {
		const result = await PrismaHelper.create('Point', data)

		return result
	}

	async get(data?: Partial<PointModel>): Promise<PointModel> {
		const getPoints = await PrismaHelper.findOne('Point', {
			where: data,
			include: {
				PointItems: {
					include: {
						items: true
					}
				}
			}
		})

		const { PointItems, ...pointWithoutItems } = getPoints as Omit<PointModel, 'items'> & {
			PointItems: (PointItemsModel & {
				items: ItemModel
			})[]
		}

		const items = PointItems.map(({ items }) => items)

		const result = {
			...pointWithoutItems,
			items
		}

		return result
	}
}

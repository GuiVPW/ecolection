import { ItemRepository } from '@data/protocols/itemRepository'
import { PointItemsRepository } from '@data/protocols/pointItemsRepository'
import { ItemModel } from '@domain/models/item'
import { UnableError } from '@presentations/errors'
import { badRequest } from '@presentations/helpers/http-helper'
import { CreatePoint, PointModel, PointRepository } from './dbCreatePointProtocols'

export class DbCreatePoint implements CreatePoint {
	constructor(
		private readonly pointRepository: PointRepository,
		private readonly itemRepository: ItemRepository,
		private readonly pointItemsRepository: PointItemsRepository
	) {}

	async create(
		data: Omit<PointModel, 'items' | 'id'> & { items: string[] }
	): Promise<Omit<PointModel, 'items'>> {
		const { items, ...pointData } = data
		const pointCreate = await this.pointRepository.create(pointData)

		if (!pointCreate) {
			throw badRequest(new Error('Could not create point.'))
		}

		await Promise.all(
			items.map(async itemId => {
				const findItem = await this.itemRepository.get({
					id: itemId
				})

				if (!findItem) {
					throw badRequest(new Error(`Could not find item with id '${itemId}'`))
				}
			})
		)

		const pointItems = await Promise.all(
			items.map(
				async (itemsId): Promise<ItemModel> => {
					const pointItemCreate = await this.pointItemsRepository.create({
						itemsId,
						pointsId: pointCreate.id
					})

					if (!pointItemCreate) {
						throw badRequest(new Error(`Could not find item with id '${itemsId}'`))
					}

					return pointItemCreate.items
				}
			)
		)

		if (!pointCreate) {
			throw badRequest(new UnableError('Point'))
		}

		const serializePoint = {
			...pointCreate,
			items: pointItems.map(item => item)
		}

		return serializePoint
	}
}

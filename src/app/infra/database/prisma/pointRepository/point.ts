import { PointRepository } from '@data/protocols/pointRepository'
import { ItemModel } from '@domain/models/item'
import { PointModel } from '@domain/models/point'
import { PointItemsModel } from '@domain/models/pointItems'
import { UnableError } from '@presentations/errors'
import { badRequest, notFoundError } from '@presentations/helpers/http-helper'
import { PrismaHelper } from '../helpers/prismaHelper'

export class PointPrismaRepository implements PointRepository {
	async create(data: Omit<PointModel, 'id'>): Promise<Omit<PointModel, 'items'>> {
		const { items, ...pointData } = data

		const pointCreate = await PrismaHelper.createPoint({ ...pointData })

		await Promise.all(
			items.map(async ({ id: itemId }) => {
				const findItem = await PrismaHelper.findOneItem({
					where: {
						id: itemId
					}
				})

				if (!findItem) {
					throw badRequest(new Error(`Could not find item with id '${itemId}'`))
				}
			})
		)

		Promise.all(
			items.map(
				async ({ id: itemId }): Promise<PointItemsModel> => {
					const pointItemCreate = await PrismaHelper.createPointItems({
						point: {
							connect: {
								id: pointCreate.id
							}
						},
						items: {
							connect: {
								id: itemId
							}
						}
					})

					if (!pointItemCreate) {
						throw badRequest(new Error(`Could not find item with id '${itemId}'`))
					}

					return pointItemCreate
				}
			)
		)

		if (!pointCreate) {
			throw badRequest(new UnableError('Point'))
		}

		return pointCreate
	}

	async get(id: string): Promise<PointModel> {
		const findPoint = await PrismaHelper.findOnePoint({
			where: {
				id
			}
		})

		if (!findPoint) {
			throw notFoundError(new Error(`Could not find point with id '${id}'`))
		}

		const { PointItems, ...point } = findPoint

		const serializePoint = {
			...point,
			items: PointItems.map(({ items }) => items)
		}

		return serializePoint
	}
}

import { notFoundError } from '@presentations/helpers/http-helper'
import { GetPoint, PointModel, PointRepository } from './dbGetPointProtocols'

export class DbGetPoint implements GetPoint {
	constructor(private readonly getPointRepository: PointRepository) {}

	async get(params?: Partial<Omit<PointModel, 'items'>>): Promise<PointModel> {
		const point = await this.getPointRepository.get(params)

		if (!point) {
			throw notFoundError(new Error('Could not find post with given parameters.'))
		}

		return point
	}
}

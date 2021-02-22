import { CreatePoint, PointModel, PointRepository } from './dbCreatePointProtocols'

export class DbCreatePoint implements CreatePoint {
	constructor(private readonly pointRepository: PointRepository) {}

	async create(data: Omit<PointModel, 'id'>): Promise<Omit<PointModel, 'items'>> {
		const point = await this.pointRepository.create(data)

		return point
	}
}

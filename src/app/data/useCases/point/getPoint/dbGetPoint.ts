import { GetPoint, PointModel, PointRepository } from './dbGetPointProtocols'

export class DbGetPoint implements GetPoint {
	constructor(private readonly getPointRepository: PointRepository) {}

	async get(id: string): Promise<PointModel> {
		const point = await this.getPointRepository.get({ id })

		return point
	}
}

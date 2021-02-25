import { DbGetPoint } from '@data/useCases/getPoint/dbGetPoint'
import { PointPrismaRepository } from '@infra/database/prisma/pointRepository/point'
import { GetPointController } from '@presentations/controllers/point/getPoint/getPoint'

export const makeGetPointController = (): GetPointController => {
	const pointPrismaRepository = new PointPrismaRepository()

	const dbGetPoint = new DbGetPoint(pointPrismaRepository)

	return new GetPointController(dbGetPoint)
}

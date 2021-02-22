import { DbCreatePoint } from '@data/useCases/createPoint/dbCreatePoint'
import { PointPrismaRepository } from '@infra/database/prisma/pointRepository/point'
import { CreatePointController } from '@presentations/controllers/createPoint/createPoint'

export const makeCreatePointController = (): CreatePointController => {
	const itemPrismaRepository = new PointPrismaRepository()

	const dbCreatePoint = new DbCreatePoint(itemPrismaRepository)

	return new CreatePointController(dbCreatePoint)
}

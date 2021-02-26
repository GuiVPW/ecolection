import { DbCreatePoint } from '@data/useCases/point/createPoint/dbCreatePoint'
import { ItemPrismaRepository } from '@infra/database/prisma/itemRepository/item'
import { PointItemsPrismaRepository } from '@infra/database/prisma/pointItemsRepository/pointItems'
import { PointPrismaRepository } from '@infra/database/prisma/pointRepository/point'
import { CreatePointController } from '@presentations/controllers/point/createPoint/createPoint'

export const makeCreatePointController = (): CreatePointController => {
	const pointPrismaRepository = new PointPrismaRepository()
	const itemPrismaRepository = new ItemPrismaRepository()
	const pointItemsPrismaRepository = new PointItemsPrismaRepository()

	const dbCreatePoint = new DbCreatePoint(
		pointPrismaRepository,
		itemPrismaRepository,
		pointItemsPrismaRepository
	)

	return new CreatePointController(dbCreatePoint)
}

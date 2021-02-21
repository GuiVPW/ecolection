import { DbGetItem } from '@data/useCases/getItem/dbGetItem'
import { ItemPrismaRepository } from '@infra/database/prisma/itemRepository/item'
import { GetItemController } from '@presentations/controllers/getItem/getItem'

export const makeGetItemController = (): GetItemController => {
	const itemPrismaRepository = new ItemPrismaRepository()

	const dbGetItem = new DbGetItem(itemPrismaRepository)

	return new GetItemController(dbGetItem)
}

import { DbGetItems } from '@data/useCases/getItems/dbGetItems'
import { ItemPrismaRepository } from '@infra/database/prisma/itemRepository/item'
import { GetItemsController } from '@presentations/controllers/getItems/getItems'

export const makeGetItemsController = (): GetItemsController => {
	const itemPrismaRepository = new ItemPrismaRepository()

	const dbgetItems = new DbGetItems(itemPrismaRepository)

	return new GetItemsController(dbgetItems)
}

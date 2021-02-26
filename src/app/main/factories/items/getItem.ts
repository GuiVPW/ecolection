import { DbGetItem } from '@data/useCases/item/getItem/dbGetItem'
import { ItemPrismaRepository } from '@infra/database/prisma/itemRepository/item'
import { GetItemController } from '@presentations/controllers/item/getItem/getItem'

export const makeGetItemController = (): GetItemController => {
	const itemPrismaRepository = new ItemPrismaRepository()

	const dbGetItem = new DbGetItem(itemPrismaRepository)

	return new GetItemController(dbGetItem)
}

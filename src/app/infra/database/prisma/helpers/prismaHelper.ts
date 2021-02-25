import { Items, PointItems, Points, Prisma, PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const PrismaHelper = {
	async connect(): Promise<void> {
		await prisma.$connect()
	},

	async disconnect(): Promise<void> {
		await prisma.$disconnect()
	},

	async createItem(data: Prisma.ItemsCreateInput): Promise<Items> {
		const createItem = await prisma.items.create({ data })

		return createItem
	},

	async findOneItem(params?: Prisma.ItemsFindUniqueArgs): Promise<Items> {
		const searchItem = await prisma.items.findFirst(params)

		return searchItem
	},

	async findManyItems(params?: Prisma.ItemsFindManyArgs): Promise<Items[]> {
		const searchItems = await prisma.items.findMany(params)

		return searchItems
	},

	async deleteItem(params: Prisma.ItemsDeleteArgs): Promise<boolean> {
		const deleteItem = await prisma.items.delete(params)

		if (!deleteItem) {
			return false
		}

		return true
	},

	async deleteManyItems(params: Prisma.ItemsDeleteManyArgs): Promise<boolean> {
		const deleteItems = await prisma.items.deleteMany(params)

		if (!deleteItems) {
			return false
		}

		return true
	},

	async findOnePoint(
		params?: Prisma.PointsFindFirstArgs
	): Promise<
		Points & {
			PointItems: (PointItems & {
				items: Items
			})[]
		}
	> {
		const searchPoint = await prisma.points.findFirst({
			...params,
			include: {
				PointItems: {
					include: {
						items: true
					}
				}
			}
		})

		return searchPoint
	},

	async createPoint(data: Prisma.PointsCreateInput): Promise<Points> {
		const create = await prisma.points.create({ data })

		return create
	},

	async createPointItems(
		params: Prisma.PointItemsCreateArgs
	): Promise<
		PointItems & {
			items: Items
		}
	> {
		const createPoint = await prisma.pointItems.create({
			...params,
			include: {
				items: true
			}
		})

		return createPoint
	}
}

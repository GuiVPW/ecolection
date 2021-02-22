import { Items, PointItems, Points, Prisma, PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const PrismaHelper = {
	async connect(): Promise<void> {
		await prisma.$connect()
	},

	async disconnect(): Promise<void> {
		await prisma.$disconnect()
	},

	async findOneItem(params?: Prisma.ItemsFindUniqueArgs): Promise<Items> {
		const search = await prisma.items.findFirst(params)

		return search
	},

	async findManyItems(params?: Prisma.ItemsFindManyArgs): Promise<Items[]> {
		const search = await prisma.items.findMany(params)

		return search
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
		const search = await prisma.points.findFirst({
			...params,
			include: {
				PointItems: {
					include: {
						items: true
					}
				}
			}
		})

		return search
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
		const create = await prisma.pointItems.create({
			...params,
			include: {
				items: true
			}
		})

		return create
	}
}

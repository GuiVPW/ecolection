import { Items, Prisma, PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const PrismaHelper = {
	async connect(): Promise<void> {
		await prisma.$connect()
	},

	async disconnect(): Promise<void> {
		await prisma.$disconnect()
	},

	async findOneItem(where?: Prisma.ItemsWhereInput): Promise<Items> {
		const search = await prisma.items.findFirst({ where })

		return search
	},

	async findManyItems(
		where?: Prisma.ItemsWhereInput,
		orderBy?: Prisma.Enumerable<Prisma.ItemsOrderByInput>
	): Promise<Items[]> {
		const search = await prisma.items.findMany({ where, orderBy })

		return search
	},

	async createItem(data: Prisma.ItemsCreateInput): Promise<Items> {
		const create = await prisma.items.create({ data })

		return create
	}
}

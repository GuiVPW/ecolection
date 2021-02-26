import { Item, PointItems, Point, Prisma } from '@prisma/client'

type PrismaModels = 'Item' | 'Point' | 'PointItems'

type Inputs = Prisma.ItemCreateInput | Prisma.PointItemsCreateInput | Prisma.PointCreateInput

export interface Helper {
	connect(): Promise<void>

	disconnect(): Promise<void>

	create(
		model: PrismaModels,
		data: Inputs
	): Promise<
		PrismaModels extends 'Item'
			? Item
			: PrismaModels extends 'PointItems'
			? PointItems
			: Point & {
					PointItems: (PointItems & {
						items: Item
					})[]
			  }
	>

	findOne(
		model: PrismaModels,
		params?: Prisma.ItemFindFirstArgs | Prisma.PointItemsFindFirstArgs | Prisma.PointFindFirstArgs
	): Promise<
		| Item
		| PointItems
		| (Point & {
				PointItems: (PointItems & {
					items: Item
				})[]
		  })
		| unknown
	>

	findMany(
		model: PrismaModels,
		params?: Prisma.ItemFindManyArgs | Prisma.PointItemsFindManyArgs | Prisma.PointFindManyArgs
	): Promise<
		| Item[]
		| PointItems[]
		| (Point & {
				PointItems: (PointItems & {
					items: Item
				})[]
		  })[]
		| unknown
	>

	delete(
		model: PrismaModels,
		params?: Prisma.PointDeleteArgs | Prisma.ItemDeleteArgs | Prisma.PointItemsDeleteArgs
	): Promise<boolean>

	deleteMany(
		model: PrismaModels,
		params?: Prisma.PointDeleteManyArgs | Prisma.ItemDeleteManyArgs | Prisma.PointItemsDeleteManyArgs
	): Promise<boolean>
}

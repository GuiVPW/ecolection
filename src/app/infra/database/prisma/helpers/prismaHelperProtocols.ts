import { Item, PointItems, Point, Prisma } from '@prisma/client'

type PrismaModels = 'Item' | 'Point' | 'PointItems'

type CreateInputs = Prisma.ItemCreateInput | Prisma.PointItemsCreateInput | Prisma.PointCreateInput
type FindFirstArgs = Prisma.ItemFindFirstArgs | Prisma.PointItemsFindFirstArgs | Prisma.PointFindFirstArgs
type FindManyArgs = Prisma.ItemFindManyArgs | Prisma.PointItemsFindManyArgs | Prisma.PointFindManyArgs
type DeleteArgs = Prisma.ItemDeleteArgs | Prisma.PointItemsDeleteArgs | Prisma.PointDeleteArgs
type DeleteManyArgs = Prisma.ItemDeleteManyArgs | Prisma.PointItemsDeleteArgs | Prisma.PointDeleteArgs

type JoinedPayloads = PrismaModels extends 'Item'
	? Item
	: PrismaModels extends 'PointItems'
	? PointItems
	: Point & {
			PointItems: (PointItems & {
				items: Item
			})[]
	  }

export interface Helper {
	connect(): Promise<void>

	disconnect(): Promise<void>

	create(model: PrismaModels, data: CreateInputs): Promise<JoinedPayloads>

	findOne(model: PrismaModels, params?: FindFirstArgs): Promise<JoinedPayloads>

	findMany(model: PrismaModels, params?: FindManyArgs): Promise<JoinedPayloads>

	delete(model: PrismaModels, params?: DeleteArgs): Promise<boolean>

	deleteMany(model: PrismaModels, params?: DeleteManyArgs): Promise<boolean>
}

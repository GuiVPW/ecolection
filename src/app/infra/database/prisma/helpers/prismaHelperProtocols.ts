import { Item, PointItems, Point, Prisma } from '@prisma/client'

type PrismaModels = 'Item' | 'Point' | 'PointItems'

type CreateInputs<Model extends PrismaModels> = Model extends 'Item'
	? Prisma.ItemCreateInput
	: Model extends 'PointItems'
	? Prisma.PointItemsCreateInput
	: Prisma.PointCreateInput

type FindFirstArgs<Model extends PrismaModels> = Model extends 'Item'
	? Prisma.ItemFindFirstArgs
	: Model extends 'PointItems'
	? Prisma.PointItemsFindFirstArgs
	: Prisma.PointFindFirstArgs

type FindManyArgs<Model extends PrismaModels> = Model extends 'Item'
	? Prisma.ItemFindManyArgs
	: Model extends 'PointItems'
	? Prisma.PointItemsFindManyArgs
	: Prisma.PointFindManyArgs

type DeleteArgs<Model extends PrismaModels> = Model extends 'Item'
	? Prisma.ItemDeleteArgs
	: Model extends 'PointItems'
	? Prisma.PointItemsDeleteArgs
	: Prisma.PointDeleteArgs

type DeleteManyArgs<Model extends PrismaModels> = Model extends 'Item'
	? Prisma.ItemDeleteManyArgs
	: Model extends 'PointItems'
	? Prisma.PointItemsDeleteManyArgs
	: Prisma.PointDeleteManyArgs

type JoinedPayloads<Model extends PrismaModels> = Model extends 'Item'
	? Item
	: Model extends 'PointItems'
	? PointItems
	: Point & {
			PointItems: (PointItems & {
				items: Item
			})[]
	  }

export interface Helper {
	connect(): Promise<void>

	disconnect(): Promise<void>

	create<Model extends PrismaModels>(
		data: CreateInputs<Model>,
		model: Model
	): Promise<JoinedPayloads<Model>>

	findOne<Model extends PrismaModels>(
		model: Model,
		params?: FindFirstArgs<Model>
	): Promise<JoinedPayloads<Model>>

	findMany<Model extends PrismaModels>(
		model: Model,
		params?: FindManyArgs<Model>
	): Promise<JoinedPayloads<Model>[]>

	delete<Model extends PrismaModels>(model: Model, params?: DeleteArgs<Model>): Promise<boolean>

	deleteMany<Model extends PrismaModels>(model: Model, params?: DeleteManyArgs<Model>): Promise<boolean>
}

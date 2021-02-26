import { Item, PointItems, Point, Prisma } from '@prisma/client'

type PrismaModels = 'Item' | 'Point' | 'PointItems'

type CreateArgs<Model extends PrismaModels> = Model extends 'Item'
	? Prisma.ItemCreateArgs
	: Model extends 'PointItems'
	? Prisma.PointItemsCreateArgs
	: Prisma.PointCreateArgs

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
	? PointItems & {
			items: Item
			points: Omit<Point, 'items'>
	  }
	: Point & {
			PointItems: (PointItems & {
				items: Item
			})[]
	  }

export interface Helper {
	connect(): Promise<void>

	disconnect(): Promise<void>

	create<Model extends PrismaModels>(data: CreateArgs<Model>, model: Model): Promise<JoinedPayloads<Model>>

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

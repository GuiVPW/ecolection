import { PrismaHelper } from '../helpers/prismaHelper'
import { ItemPrismaRepository } from '../itemRepository/item'
import { PointPrismaRepository } from '../pointRepository/point'
import { PointItemsPrismaRepository } from './pointItems'

describe('Point items Prisma Repository', () => {
	beforeAll(PrismaHelper.connect)

	afterAll(PrismaHelper.disconnect)

	beforeEach(async () => await PrismaHelper.deleteMany<'PointItems'>('PointItems'))

	const makeSut = () => ({
		pointItems: new PointItemsPrismaRepository(),
		items: new ItemPrismaRepository(),
		points: new PointPrismaRepository()
	})

	test('Should create a point item on success', async () => {
		const sut = makeSut()

		const createPoint = await sut.points.create({
			name: 'any_name',
			image: 'any_image',
			city: 'any_city',
			email: 'any_email',
			latitude: '0',
			longitude: '0',
			uf: 'NA',
			whatsapp: 'any_whatsapp'
		})

		const createItem = await sut.items.create({
			image: 'valid_image',
			title: 'valid_title'
		})

		const pointItem = await sut.pointItems.create({
			itemsId: createItem.id,
			pointsId: createPoint.id
		})

		expect(pointItem).toBeTruthy()
		expect(pointItem).toEqual(expect.objectContaining(pointItem))
	})
})

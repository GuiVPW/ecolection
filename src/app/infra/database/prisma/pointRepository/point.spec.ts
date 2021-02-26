import { PrismaHelper } from '../helpers/prismaHelper'
import { PointPrismaRepository } from './point'

describe('Point Prisma Repository', () => {
	beforeAll(PrismaHelper.connect)

	afterAll(PrismaHelper.disconnect)

	beforeEach(
		async () =>
			await PrismaHelper.deleteMany('Point', {
				where: {
					name: 'any_name',
					image: 'any_image'
				}
			})
	)

	const makeSut = (): PointPrismaRepository => {
		return new PointPrismaRepository()
	}

	test('Should create a point on success', async () => {
		const sut = makeSut()
		const point = await sut.create({
			name: 'any_name',
			image: 'any_image',
			city: 'any_city',
			email: 'any_email',
			latitude: '0',
			longitude: '0',
			uf: 'NA',
			whatsapp: 'any_whatsapp'
		})

		expect(point).toBeTruthy()
		expect.objectContaining(point)
	})
})

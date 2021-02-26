import { PrismaHelper } from '../helpers/prismaHelper'
import { ItemPrismaRepository } from './item'

describe('Item Prisma Repository', () => {
	beforeAll(PrismaHelper.connect)

	afterAll(PrismaHelper.disconnect)

	beforeEach(
		async () =>
			await PrismaHelper.deleteManyItems({
				where: {
					title: 'any_title',
					image: 'any_image'
				}
			})
	)

	const makeSut = (): ItemPrismaRepository => {
		return new ItemPrismaRepository()
	}

	test('Should create an item on success', async () => {
		const sut = makeSut()
		const item = await sut.add({
			title: 'any_title',
			image: 'any_image'
		})

		expect(item).toBeTruthy()
		expect(item.id).toBeTruthy()
		expect(item.title).toBe('any_title')
		expect(item.image).toBe('any_image')
	})

	test('Should return an item on success', async () => {
		const sut = makeSut()

		await sut.add({
			title: 'any_title',
			image: 'any_image'
		})

		const item = await sut.get()

		expect(item).toBeTruthy()
		expect(item.id).toBeTruthy()
		expect(item.title).toBe('any_title')
		expect(item.image).toBe('any_image')
	})

	test('Should return many items on success', async () => {
		const sut = makeSut()

		for (let count = 0; count <= 3; count++) {
			await sut.add({
				title: 'any_title',
				image: 'any_image'
			})
		}

		const items = await sut.getMany()

		expect(items).toBeTruthy()
		expect(items).toBeInstanceOf(Array)
		expect(items[0].id).toBeTruthy()
		expect(items[0].title).toBeTruthy()
		expect(items[0].image).toBeTruthy()
	})
})

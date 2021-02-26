import { PrismaHelper as sut } from './prismaHelper'

describe('Prisma Helper', () => {
	beforeAll(async () => {
		return await sut.connect()
	})

	afterAll(async () => {
		return await sut.disconnect()
	})

	test('Should reconnect if Prisma is down', async () => {
		let items = await sut.findMany<'Item'>('Item')
		expect(items).toBeTruthy()
		await sut.disconnect()
		items = await sut.findMany<'Item'>('Item')
		await sut.disconnect()
	})
})

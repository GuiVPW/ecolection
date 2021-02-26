import { ItemModel, ItemRepository } from './dbGetItemProtocols'
import { DbGetItem } from './dbGetItem'

const makeItemRepository = (): ItemRepository => {
	class ItemRepositoryStub implements ItemRepository {
		async get(data?: Partial<ItemModel>): Promise<ItemModel> {
			const fakeItem: ItemModel = {
				id: 'valid_id',
				title: 'valid_title',
				image: 'valid_image'
			}

			return Promise.resolve(fakeItem)
		}
	}

	return new ItemRepositoryStub()
}

interface SutTypes {
	sut: DbGetItem
	itemRepositoryStub: ItemRepository
}

const makeSut = (): SutTypes => {
	const makeItemRepositoryStub = makeItemRepository()
	const sut = new DbGetItem(makeItemRepositoryStub)

	return {
		itemRepositoryStub: makeItemRepositoryStub,
		sut
	}
}

describe('DbGetItem Usecase', () => {
	test('Should throw if ItemRepository get method throws', async () => {
		const { sut, itemRepositoryStub } = makeSut()

		jest
			.spyOn(itemRepositoryStub, 'get')
			.mockReturnValueOnce(Promise.reject(new Error('Could not find item with given parameters.')))

		const promise = sut.get()

		expect(promise).rejects.toThrowError('Could not find item with given parameters.')
	})

	test('Should call ItemRepository get method with correct values', async () => {
		const { sut, itemRepositoryStub } = makeSut()

		const getSpy = jest.spyOn(itemRepositoryStub, 'get')

		await sut.get()

		expect(getSpy).toHaveBeenCalledWith(undefined)
	})

	test('Should return an item on success', async () => {
		const { sut } = makeSut()

		const item = await sut.get()

		expect(item).toEqual({
			id: 'valid_id',
			title: 'valid_title',
			image: 'valid_image'
		})
	})
})

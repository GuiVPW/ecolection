import { ItemModel, ItemRepository } from './dbGetItemsProtocols'
import { DbGetItems } from './dbGetItems'

const makeItemRepository = (): ItemRepository => {
	class ItemRepositoryStub implements ItemRepository {
		async getMany(data?: Partial<ItemModel>): Promise<ItemModel[]> {
			const fakeItems: ItemModel[] = [
				{
					id: 'valid_id',
					title: 'valid_title',
					image: 'valid_image'
				},
				{
					id: 'valid_id_clone',
					title: 'valid_title_clone',
					image: 'valid_image_clone'
				}
			]

			return Promise.resolve(fakeItems)
		}
	}

	return new ItemRepositoryStub()
}

interface SutTypes {
	sut: DbGetItems
	itemRepositoryStub: ItemRepository
}

const makeSut = (): SutTypes => {
	const makeItemRepositoryStub = makeItemRepository()
	const sut = new DbGetItems(makeItemRepositoryStub)

	return {
		itemRepositoryStub: makeItemRepositoryStub,
		sut
	}
}

describe('DbGetItems Usecase', () => {
	test('Should throw if ItemRepository get many method throws', async () => {
		const { sut, itemRepositoryStub } = makeSut()

		jest
			.spyOn(itemRepositoryStub, 'getMany')
			.mockReturnValueOnce(Promise.reject(new Error('Could not find items with given parameters.')))

		const promise = sut.get()

		expect(promise).rejects.toThrowError('Could not find items with given parameters.')
	})
})

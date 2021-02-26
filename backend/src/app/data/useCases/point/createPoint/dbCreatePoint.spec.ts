// import { PointModel, PointRepository } from './dbCreatePointProtocols'
// import { DbCreatePoint } from './dbCreatePoint'

// const makePointRepository = (): PointRepository => {
// 	class PointRepositoryStub implements PointRepository {
// 		async create(data?: Partial<PointModel>): Promise<PointModel> {
// 			const fakePoint: PointModel = {
// 				id: 'valid_id',
// 				name: 'any_name',
// 				image: 'any_image',
// 				city: 'any_city',
// 				email: 'any_email',
// 				latitude: '0',
// 				longitude: '0',
// 				uf: 'NA',
// 				whatsapp: 'any_whatsapp',
// 				items: [
// 					{
// 						id: 'valid_id',
// 						image: 'valid_image',
// 						title: 'valid_title'
// 					}
// 				]
// 			}

// 			return Promise.resolve(fakePoint)
// 		}
// 	}

// 	return new PointRepositoryStub()
// }

// interface SutTypes {
// 	sut: DbCreatePoint
// 	pointItemRepositoryStub: PointRepository
// }

// const makeSut = (): SutTypes => {
// 	const makePointRepositoryStub = makePointRepository()
// 	const sut = new DbCreatePoint(makePointRepositoryStub)

// 	return {
// 		pointItemRepositoryStub: makePointRepositoryStub,
// 		sut
// 	}
// }

// describe('DbCreatePoint Usecase', () => {
// 	test('Should throw if PointRepository get method throws', async () => {
// 		const { sut, pointItemRepositoryStub } = makeSut()

// 		jest
// 			.spyOn(pointItemRepositoryStub, 'get')
// 			.mockReturnValueOnce(Promise.reject(new Error('Could not find pointItem with given parameters.')))

// 		const promise = sut.get()

// 		expect(promise).rejects.toThrowError('Could not find pointItem with given parameters.')
// 	})

// 	test('Should call PointRepository get method with correct values', async () => {
// 		const { sut, pointItemRepositoryStub } = makeSut()

// 		const getSpy = jest.spyOn(pointItemRepositoryStub, 'get')

// 		await sut.get()

// 		expect(getSpy).toHaveBeenCalledWith(undefined)
// 	})

// 	test('Should return an pointItem on success', async () => {
// 		const { sut } = makeSut()

// 		const pointItem = await sut.get()

// 		expect(pointItem).toEqual({
// 			id: 'valid_id',
// 			title: 'valid_title',
// 			image: 'valid_image'
// 		})
// 	})
// })

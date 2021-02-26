import { PointModel, PointRepository } from './dbGetPointProtocols'
import { DbGetPoint } from './dbGetPoint'

const makePointRepository = (): PointRepository => {
	class PointRepositoryStub implements PointRepository {
		async get(data?: Partial<PointModel>): Promise<PointModel> {
			const fakePoint: PointModel = {
				id: 'valid_id',
				name: 'valid_name',
				email: 'valid_email',
				uf: 'NA',
				city: 'valid_city',
				image: 'valid_image',
				latitude: '0',
				longitude: '0',
				whatsapp: 'valid_whatsapp',
				items: [
					{
						id: 'valid_id',
						title: 'valid_title',
						image: 'valid_image'
					}
				]
			}

			return Promise.resolve(fakePoint)
		}
	}

	return new PointRepositoryStub()
}

interface SutTypes {
	sut: DbGetPoint
	postRepositoryStub: PointRepository
}

const makeSut = (): SutTypes => {
	const makePointRepositoryStub = makePointRepository()
	const sut = new DbGetPoint(makePointRepositoryStub)

	return {
		postRepositoryStub: makePointRepositoryStub,
		sut
	}
}

describe('DbGetPoint Usecase', () => {
	test('Should throw if PointRepository get method throws', async () => {
		const { sut, postRepositoryStub } = makeSut()

		jest
			.spyOn(postRepositoryStub, 'get')
			.mockReturnValueOnce(Promise.reject(new Error('Could not find post with given parameters.')))

		const promise = sut.get({ name: 'valid_name', email: 'valid_email' })

		expect(promise).rejects.toThrowError('Could not find post with given parameters.')
	})

	test('Should call PointRepository get method with correct values', async () => {
		const { sut, postRepositoryStub } = makeSut()

		const getSpy = jest.spyOn(postRepositoryStub, 'get')

		await sut.get({ name: 'valid_name', email: 'valid_email' })

		expect(getSpy).toHaveBeenCalledWith({ name: 'valid_name', email: 'valid_email' })
	})

	test('Should return an post on success', async () => {
		const { sut } = makeSut()

		const post = await sut.get({ name: 'valid_name', email: 'valid_email' })

		expect(post).toEqual({
			id: 'valid_id',
			name: 'valid_name',
			email: 'valid_email',
			uf: 'NA',
			city: 'valid_city',
			image: 'valid_image',
			latitude: '0',
			longitude: '0',
			whatsapp: 'valid_whatsapp',
			items: [
				{
					id: 'valid_id',
					title: 'valid_title',
					image: 'valid_image'
				}
			]
		})
	})
})

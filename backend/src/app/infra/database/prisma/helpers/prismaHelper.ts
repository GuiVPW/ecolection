import { PrismaClient } from '@prisma/client'
import { Helper } from './prismaHelperProtocols'

export const prisma = new PrismaClient()

function lowerCaseCapital(string: string) {
	return string.charAt(0).toLowerCase() + string.slice(1)
}

export const PrismaHelper: Helper = {
	async connect(): Promise<void> {
		await prisma.$connect()
	},

	async disconnect(): Promise<void> {
		await prisma.$disconnect()
	},

	async create(data, model) {
		const create = prisma[lowerCaseCapital(model)].create(data)

		return create
	},

	async findOne(model, params) {
		const search = await prisma[lowerCaseCapital(model)].findFirst(params)

		return search
	},

	async findMany(model, params) {
		const search = await prisma[lowerCaseCapital(model)].findMany(params)

		return search
	},

	async delete(model, params) {
		const deleteOne = await prisma[lowerCaseCapital(model)].delete(params)

		if (!deleteOne) {
			return false
		}

		return true
	},

	async deleteMany(model, params) {
		const deleteMany = await prisma[lowerCaseCapital(model)].deleteMany(params)

		if (!deleteMany) {
			return false
		}

		return true
	}
}

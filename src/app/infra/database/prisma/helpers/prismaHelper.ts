import { PrismaClient } from '@prisma/client'
import { Helper } from './prismaHelperProtocols'

export const prisma = new PrismaClient()

export const PrismaHelper: Helper = {
	async connect(): Promise<void> {
		await prisma.$connect()
	},

	async disconnect(): Promise<void> {
		await prisma.$disconnect()
	},

	async create(model, data) {
		const create = prisma[model.toLowerCase()].create({ data })

		return create
	},

	async findOne(model, params) {
		const search = await prisma[model.toLowerCase()].findFirst(params)

		return search
	},

	async findMany(model, params) {
		const search = await prisma[model.toLowerCase()].findMany(params)

		return search
	},

	async delete(model, params) {
		const deleteOne = await prisma[model.toLowerCase()].delete(params)

		if (!deleteOne) {
			return false
		}

		return true
	},

	async deleteMany(model, params) {
		const deleteMany = await prisma[model.toLowerCase()].deleteMany(params)

		if (!deleteMany) {
			return false
		}

		return true
	}
}

import { PrismaClient } from '@prisma/client'
import { items } from './items'

const prisma = new PrismaClient()

async function main() {
	for (let item of items) {
		await prisma.items.create({
			data: item
		})
	}
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

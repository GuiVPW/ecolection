import { adaptResolver } from '@main/adapters'
import { makeCreatePointController } from '@main/factories/point/createPoint'
import { makeGetPointController } from '@main/factories/point/getPoint'

export default {
	Query: {
		getPoint: async (parent: any, args: any) => adaptResolver(makeGetPointController(), args)
	},

	Mutation: {
		createPoint: async (parent: any, args: any) => adaptResolver(makeCreatePointController(), args)
	}
}

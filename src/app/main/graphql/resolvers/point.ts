import { adaptResolver } from '@main/adapters'
import { makeCreatePointController } from '@main/factories/point/createPoint'

export default {
	Mutation: {
		createPoint: async (parent: any, args: any) => adaptResolver(makeCreatePointController(), args)
	}
}

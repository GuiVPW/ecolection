import { adaptResolver } from '@main/adapters'
import { makeGetItemController } from '@main/factories/items/getItem'

export default {
	Query: {
		getItem: async (parent: any, args: any) => adaptResolver(makeGetItemController(), args)
	}
}

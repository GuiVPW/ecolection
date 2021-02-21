import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import depthLimit from 'graphql-depth-limit'

import typeDefs from '@main/graphql/typeDefs'
import resolvers from '@main/graphql/resolvers'

export const setupApollo = async (app: Express) => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		validationRules: [depthLimit(6)]
	})

	server.applyMiddleware({ app })

	return { server }
}

import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import depthLimit from 'graphql-depth-limit'

import typeDefs from '@main/graphql/typeDefs'
import resolvers from '@main/graphql/resolvers'
import { GraphQLError } from 'graphql'

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
	errors?.forEach(error => {
		response.data = undefined
		if (checkError(error, 'UserInputError')) response.http.status = 400
		else if (checkError(error, 'AuthenticationError')) response.http.status = 401
		else if (checkError(error, 'ForbiddenError')) response.http.status = 403
		else response.http.status = 500
	})
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
	return [error.name, error.originalError?.name].some(name => name === errorName)
}

const setupApollo = async (app: Express) => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		validationRules: [depthLimit(6)],
		plugins: [
			{
				requestDidStart: () => ({
					willSendResponse: ({ response, errors }) => handleErrors(response, errors)
				})
			}
		]
	})

	server.applyMiddleware({ app })

	return { server }
}

export default setupApollo

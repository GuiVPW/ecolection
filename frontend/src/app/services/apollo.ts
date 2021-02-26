import { ApolloClient, InMemoryCache } from '@apollo/client'
import { from, split } from '@apollo/client/link/core'
import { getMainDefinition } from '@apollo/client/utilities'
import { createUploadLink } from 'apollo-upload-client'

import baseUrl from '../app/constants/apiUrl'

const uploadLink = createUploadLink({
	uri: `${baseUrl}/graphql`
})

export const splitLink = split(({ query }) => {
	const definition = getMainDefinition(query)
	return (
		definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
	)
}, uploadLink)

const link = from([splitLink])

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
})

import { ApolloClient, InMemoryCache } from '@apollo/client'

import baseUrl from '../constants/apiUrl'

export const client = new ApolloClient({
	uri: `${baseUrl}/graphql`,
	cache: new InMemoryCache()
})

import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		getItem: Item!
	}

	type Item {
		id: String
		title: String!
		image: String!
	}
`

import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		getItem(id: String!): Item!
	}

	type Item {
		id: String
		title: String!
		image: String!
	}
`

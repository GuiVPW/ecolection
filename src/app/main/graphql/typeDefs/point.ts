import { gql } from 'apollo-server-express'

export default gql`
	extend type Mutation {
		createPoint(data: CreatePointInput!): Point!
	}

	type Point {
		name: String!
		email: String!
		image: String!
		whatsapp: String!
		latitude: Int!
		longitude: Int!
		city: String!
		uf: String!
		items: [Item]!
	}

	input CreatePointInput {
		name: String!
		email: String!
		image: String!
		whatsapp: String!
		latitude: Int!
		longitude: Int!
		city: String!
		uf: String!
		items: [ItemInput]
	}

	input ItemInput {
		id: String
		title: String!
		image: String!
	}
`

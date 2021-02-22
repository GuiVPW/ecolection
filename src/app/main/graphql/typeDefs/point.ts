import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		getPoint(id: String!): Point!
	}

	extend type Mutation {
		createPoint(data: CreatePointInput!): Point!
	}

	type Point {
		id: String!
		name: String!
		email: String!
		image: String!
		whatsapp: String!
		latitude: String!
		longitude: String!
		city: String!
		uf: String!
		items: [Item]!
	}

	input CreatePointInput {
		name: String!
		email: String!
		image: String!
		whatsapp: String!
		latitude: String!
		longitude: String!
		city: String!
		uf: String!
		items: [String!]
	}
`

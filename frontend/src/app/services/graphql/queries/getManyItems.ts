import { gql } from '@apollo/client'

export const GET_MANY_ITEMS_QUERY = gql`
	query {
		getItems {
			id
			title
			image
		}
	}
`

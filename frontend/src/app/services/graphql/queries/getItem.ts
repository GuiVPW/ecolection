import { gql } from '@apollo/client'

export const GetItemByIdQuery = gql`
	query($id: String!) {
		getItem(id: $id) {
			id
			title
			image
		}
	}
`

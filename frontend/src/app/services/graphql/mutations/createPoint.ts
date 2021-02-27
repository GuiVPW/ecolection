import { gql } from '@apollo/client'

export const CREATE_POINT_MUTATION = gql`
	mutation(
		$name: String!
		$email: String!
		$whatsapp: String!
		$image: String!
		$latitude: String!
		$longitude: String!
		$city: String!
		$uf: String!
		$items: [String!]
	) {
		createPoint(
			data: {
				name: $name
				email: $email
				whatsapp: $whatsapp
				image: $image
				latitude: $latitude
				longitude: $longitude
				city: $city
				uf: $uf
				items: $items
			}
		) {
			name
		}
	}
`

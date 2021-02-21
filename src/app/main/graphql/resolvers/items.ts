export default {
	Query: {
		getItem() {
			return {
				id: Math.floor(Math.random() * 10),
				title: 'lamp',
				image: 'lampadas.svg'
			}
		}
	}
}

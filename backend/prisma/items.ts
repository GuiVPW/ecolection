import { Item } from '@prisma/client'

export const items: Omit<Item, 'id'>[] = [
	{
		title: 'lamps',
		image: 'lampadas.svg'
	},
	{
		title: 'Bateries',
		image: 'baterias.svg'
	},
	{
		title: 'Papers',
		image: 'papeis.svg'
	},
	{
		title: 'Eletronics',
		image: 'eletronicos.svg'
	},
	{
		title: 'Organic',
		image: 'organicos.svg'
	},
	{
		title: 'Kitchen Oil',
		image: 'oleo.svg'
	}
]

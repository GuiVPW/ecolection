import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiArrowLeft } from 'react-icons/fi'
import { ibge } from '../../services/apis/ibge'

import logo from '../../images/logo.svg'

import { toastOptions } from 'src/app/utils/toastify/config'
import { toast } from 'react-toastify'
import {
	StyledContainer,
	StyledForm,
	StyledHeader,
	StyledField,
	StyledFieldGroup,
	StyledInput,
	StyledItem,
	StyledItemsGrid,
	StyledLegend,
	StyledSelect,
	StyledFieldset,
	StyledFormButton
} from './createPoint.styled'
import { CREATE_POINT, HOME } from 'src/app/constants/routes'

import { useDropzone } from 'react-dropzone'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { useMutation, useQuery } from '@apollo/client'
import { GET_MANY_ITEMS_QUERY } from 'src/app/services/graphql/queries/getManyItems'
import { CREATE_POINT_MUTATION } from 'src/app/services/graphql/mutations/createPoint'

import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'

interface Item {
	id: string
	title: string
	image: string
	__typename?: string
}

interface IBGEUFResponse {
	sigla: string
	nome: string
}

interface IBGECityResponse {
	nome: string
}

interface CreatePointState {
	items: Item[]
	ufs: IBGEUFResponse[]
	cities: IBGECityResponse[]
	initialPosition: [number, number]
	selectedFile?: File
	selectedUf: string
	selectedCity: string
	selectedPosition: [number, number]
	selectedItems: string[]
}

interface CreatePointFormData {
	name: string
	email: string
	whatsapp: string
}

const CreatePoint = (): JSX.Element => {
	const { data, loading } = useQuery(GET_MANY_ITEMS_QUERY)
	const [createPoint] = useMutation(CREATE_POINT_MUTATION)

	const { register, handleSubmit } = useForm<CreatePointFormData>({
		defaultValues: {
			name: '',
			email: '',
			whatsapp: ''
		}
	})

	const onDrop = useCallback(acceptedFiles => {
		console.log(acceptedFiles)
		// Do something with the files
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	const [stateCreatePoint, setStateCreatePoint] = useState<CreatePointState>({
		items: [],
		ufs: [],
		cities: [],
		initialPosition: [0, 0],
		selectedUf: '0',
		selectedCity: '0',
		selectedPosition: [0, 0],
		selectedItems: []
	})

	const history = useHistory()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords

				setStateCreatePoint({ ...stateCreatePoint, initialPosition: [latitude, longitude] })
			},
			() => {
				toast.error('❌ Oops! Something went wrong. =/', toastOptions)
			},
			{
				timeout: 30000,
				enableHighAccuracy: true
			}
		)
	}, [])

	// Load items
	useEffect(() => {
		;(async () => {
			if (data) {
				const loadItems = async () => {
					const items = (await data.getItems) as Item[]
					setStateCreatePoint({
						...stateCreatePoint,
						items
					})
				}

				await loadItems()
			}
		})()
	}, [loading])

	// Load UFs
	useEffect(() => {
		async function loadUfs() {
			const response = await ibge.get<IBGEUFResponse[]>('localidades/estados?orderBy=nome')

			const ufInitials = response.data.map(uf => {
				return {
					sigla: uf.sigla,
					nome: uf.nome
				}
			})

			setStateCreatePoint({ ...stateCreatePoint, ufs: ufInitials })
		}

		loadUfs()
	}, [])

	// Load Cities
	useEffect(() => {
		async function loadCities() {
			if (stateCreatePoint.selectedUf === '0') return

			const response = await ibge.get<IBGECityResponse[]>(
				`localidades/estados/${stateCreatePoint.selectedUf}/municipios`
			)

			const cityNames = response.data.map(city => ({ nome: city.nome }))

			setStateCreatePoint({ ...stateCreatePoint, cities: cityNames })
		}

		loadCities()
	}, [stateCreatePoint.selectedUf])

	function handleSelectItem(id: string) {
		const alreadySelected = stateCreatePoint.selectedItems.findIndex(item => item === id)

		if (alreadySelected >= 0) {
			const filteredItems = stateCreatePoint.selectedItems.filter(item => item !== id)

			setStateCreatePoint({ ...stateCreatePoint, selectedItems: filteredItems })
		} else {
			setStateCreatePoint({
				...stateCreatePoint,
				selectedItems: [...stateCreatePoint.selectedItems, id]
			})
		}
	}

	const handleChange = (
		keys: keyof Pick<CreatePointState, 'selectedUf' | 'selectedCity'>
	) => (e: React.ChangeEvent<HTMLSelectElement>) => {
		setStateCreatePoint({
			...stateCreatePoint,
			[keys]: e.target.value
		})
	}

	const onSubmit = handleSubmit(async formData => {
		const { name, email, whatsapp } = formData
		const [latitude, longitude] = stateCreatePoint.selectedPosition

		const { errors } = await createPoint({
			variables: {
				name,
				email,
				whatsapp,
				image: 'image',
				latitude: String(latitude),
				longitude: String(longitude),
				city: stateCreatePoint.selectedCity,
				uf: stateCreatePoint.selectedUf,
				items: stateCreatePoint.items.map(({ id }) => id)
			}
		})

		if (errors) {
			console.log('[errors]', errors)
			toast.error('❌ Erro!', toastOptions)
		}

		toast('✅ Criado com sucesso!', toastOptions)
		history.push('/')
	})

	const Markers = () => {
		useMapEvents({
			click: ({ latlng }) => {
				setStateCreatePoint({
					...stateCreatePoint,
					selectedPosition: [latlng.lat, latlng.lng]
				})
			}
		})

		return (
			stateCreatePoint.selectedPosition && (
				<Marker
					key={stateCreatePoint.selectedPosition[0]}
					position={stateCreatePoint.selectedPosition}
					icon={
						new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })
					}
				/>
			)
		)
	}

	if (loading) {
		return <h3>Loading...</h3>
	}

	return (
		<StyledContainer>
			<StyledHeader>
				<img src={logo} alt="Ecolection" />

				<Link to={HOME}>
					<FiArrowLeft />
					Home
				</Link>
			</StyledHeader>

			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<h1>Register of the collection point</h1>

				<div {...getRootProps()}>
					<input {...getInputProps()} />
				</div>

				<StyledFieldset>
					<StyledLegend>
						<h2>Dados</h2>
					</StyledLegend>

					<StyledField>
						<label htmlFor="name">Entity name</label>
						<StyledInput ref={register} type="text" name="name" />
					</StyledField>

					<StyledFieldGroup>
						<StyledField>
							<label htmlFor="email">E-mail</label>
							<StyledInput ref={register} type="text" name="email" />
						</StyledField>

						<StyledField>
							<label htmlFor="whatsapp">Whatsapp</label>
							<StyledInput ref={register} type="text" name="whatsapp" />
						</StyledField>
					</StyledFieldGroup>
				</StyledFieldset>

				<StyledFieldset>
					<StyledLegend>
						<h2>Address</h2>
						<span>Select the address on the map</span>
					</StyledLegend>

					<div>
						<MapContainer center={stateCreatePoint.initialPosition} zoom={15}>
							<TileLayer
								attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Markers />
						</MapContainer>
					</div>
				</StyledFieldset>

				<StyledFieldGroup>
					<StyledField>
						<label htmlFor="uf">State (ST)</label>

						<StyledSelect
							name="uf"
							value={stateCreatePoint.selectedUf}
							onChange={handleChange('selectedUf')}
						>
							<option value="0">Choose a UF</option>
							{stateCreatePoint.ufs.map(uf => (
								<option key={uf.nome} value={uf.sigla}>
									{uf.sigla}
								</option>
							))}
						</StyledSelect>
					</StyledField>

					<StyledField>
						<label htmlFor="city">City</label>

						<StyledSelect
							value={stateCreatePoint.selectedCity}
							onChange={handleChange('selectedCity')}
						>
							<option value="0">Choose a city</option>

							{stateCreatePoint.cities.map(city => (
								<option key={city.nome} value={city.nome}>
									{city.nome}
								</option>
							))}
						</StyledSelect>
					</StyledField>
				</StyledFieldGroup>

				<StyledFieldset>
					<StyledLegend>
						<h2>Collection items</h2>
						<span>Choose one or more items below</span>
					</StyledLegend>

					<StyledItemsGrid>
						{stateCreatePoint.items.map(item => (
							<StyledItem
								key={item.id}
								onClick={() => handleSelectItem(item.id)}
								select={stateCreatePoint.selectedItems.includes(item.id)}
							>
								<img src={item.image} />
								<span>{item.title}</span>
							</StyledItem>
						))}
					</StyledItemsGrid>
				</StyledFieldset>

				<StyledFormButton type="submit">Register a new collection point</StyledFormButton>
			</StyledForm>
		</StyledContainer>
	)
}

export default CreatePoint

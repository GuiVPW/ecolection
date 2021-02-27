import styled from 'styled-components'

export const StyledContainer = styled.div`
	width: 100%;
	max-width: 1100px;
	margin: 0 auto;
`

export const StyledHeader = styled.header`
	margin-top: 48px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	a {
		color: var(--title-color);
		font-weight: bold;
		text-decoration: none;
		display: flex;
		align-items: center;

		svg {
			margin-right: 16px;
			color: var(--primary-color);
		}
	}
`

export const StyledForm = styled.form`
	margin: 80px auto;
	padding: 64px;
	max-width: 730px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	background: #fafafa;

	h1 {
		font-size: 36px;
	}

	.leaflet-container {
		width: 100%;
		height: 350px;
		border-radius: 8px;
		margin-bottom: 24px;
	}
`

export const StyledFormButton = styled.button`
	width: 260px;
	height: 56px;
	background: var(--primary-color);
	border-radius: 8px;
	color: #fff;
	font-weight: bold;
	font-size: 16px;
	border: 0;
	align-self: flex-end;
	margin-top: 40px;
	transition: background-color 0.2s;
	cursor: pointer;
`

export const StyledInput = styled.input`
	flex: 1;
	background: #f0f0f5;
	border-radius: 8px;
	border: 0;
	padding: 16px 24px;
	font-size: 16px;
	color: #6c6c80;

	&::placeholder {
		color: #a0a0b2;
	}

	& + & {
		margin-left: 24px;
	}
`

export const StyledField = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-bottom: 24px;

	:disabled {
		cursor: not-allowed;
	}

	label {
		font-size: 14px;
		margin-bottom: 8px;
		color: #7f7f7f;
		font-weight: bold;
	}

	& + & {
		margin-left: 24px;
	}
`

export const StyledFieldset = styled.fieldset`
	margin-top: 64px;
	min-inline-size: auto;
	border: 0;
`

export const StyledLegend = styled.legend`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40px;

	h2 {
		font-size: 24px;
	}

	span {
		font-size: 14px;
		font-weight: normal;
		color: var(--text-color);
	}
`

export const StyledFieldGroup = styled.div`
	display: flex;
	flex: 1;
`

export const StyledSelect = styled.select`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	flex: 1;
	background: #f0f0f5;
	border-radius: 8px;
	border: 0;
	padding: 16px 24px;
	font-size: 16px;
	color: #6c6c80;
`

export const StyledItemsGrid = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
	list-style: none;
`

export const StyledItem = styled.li`
	background: ${(props: { select: boolean }) => (!props.select ? '#f5f5f5' : '#e1faec')};
	border: 2px solid
		${(props: { select: boolean }) => (!props.select ? '#f5f5f5' : ' #34cb79;')};
	height: 180px;
	border-radius: 8px;
	padding: 32px 24px 16px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	cursor: pointer;

	span {
		flex: 1;
		margin-top: 12px;
		display: flex;
		align-items: center;
		color: var(--title-color);
	}
`

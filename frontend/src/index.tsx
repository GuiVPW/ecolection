import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import App from './app/app'

import { ApolloProvider } from '@apollo/client'
import { client } from './app/services/apollo'
import { GlobalStyles } from './app/styles'

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyles />
		<ApolloProvider client={client}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

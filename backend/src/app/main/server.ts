import http from 'http'
import { GRAPHQL_PATH } from '@main/config/constants/server'
import { PORT } from '@main/config'
import { createExpressApp } from '@main/config/app'

async function main() {
	try {
		const { app, server } = await createExpressApp()
		const httpServer = http.createServer(app)

		server.installSubscriptionHandlers(httpServer)

		httpServer.listen(PORT, () => {
			console.log(`Http Server runing at: http://localhost:${PORT}}`)
			console.log(`Static files been served at: http://localhost:${PORT}/static`)
			console.log(`GraphQL Server runing at: http://localhost:${PORT}${GRAPHQL_PATH}`)
			console.log(`GraphQL Subscription Server runing at: ws://localhost:${PORT}${GRAPHQL_PATH}`)
		})
	} catch (error) {
		console.error(error)
	}
}

main()

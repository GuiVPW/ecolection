import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import { setupApollo } from './apollo'

export const createExpressApp = async () => {
	const app = express()

	setupMiddlewares(app)
	setupRoutes(app)

	const { server } = await setupApollo(app)

	return { app, server }
}

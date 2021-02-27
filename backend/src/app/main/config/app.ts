import express from 'express'
import setupMiddlewares from './middlewares'
import setupApollo from './apollo'
import setupStaticFiles from './staticFiles'

export const createExpressApp = async () => {
	const app = express()

	setupStaticFiles(app)
	setupMiddlewares(app)

	const { server } = await setupApollo(app)

	return { app, server }
}

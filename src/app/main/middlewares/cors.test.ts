import request from 'supertest'
import { createExpressApp } from '@main/config/app'

describe('CORS Middleware', () => {
	test('Should enable CORS', async () => {
		const { app } = await createExpressApp()

		app.get('/test_cors', (req, res) => {
			res.send()
		})

		await request(app).get('/test_cors').expect('access-control-allow-origin', '*')
	})
})

import request from 'supertest'
import { createExpressApp } from '@main/config/app'

describe('Helmet Middleware', () => {
	test('Should enable Helmet', async () => {
		const { app } = await createExpressApp()

		app.get('/test_helmet', (req, res) => {
			res.send()
		})

		await request(app).get('/test_helmet').expect('referrer-policy', 'no-referrer')
	})
})

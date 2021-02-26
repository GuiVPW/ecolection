import request from 'supertest'
import { createExpressApp } from '@main/config/app'

describe('Body Parser Middleware', () => {
	test('Should parse body as json', async () => {
		const { app } = await createExpressApp()

		app.post('/test_body_parser', (req, res) => {
			res.send(req.body)
		})

		await request(app).post('/test_body_parser').send({ name: 'Guilherme' }).expect({ name: 'Guilherme' })
	})
})

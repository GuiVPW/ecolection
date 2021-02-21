import { Express } from 'express'
import { IN_PROD } from './constants/envs'
import { bodyParser, contentType, cors, morgan } from '../middlewares'

export default (app: Express): void => {
	app.use(bodyParser)
	app.use(cors)
	app.use(contentType)
	if (!IN_PROD) {
		app.use(morgan)
	}
}

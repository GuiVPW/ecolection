import { Express } from 'express'
import { IN_PROD } from './constants/envs'
import { bodyParser, contentType, cors, morgan, helmet } from '../middlewares'

export default (app: Express): void => {
	app.use(bodyParser)
	app.use(cors)
	app.use(contentType)
	app.use(helmet)
	if (!IN_PROD) {
		app.use(morgan)
	}
}

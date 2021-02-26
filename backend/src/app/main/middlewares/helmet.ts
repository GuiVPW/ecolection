import helmetMiddleware from 'helmet'
import { IN_PROD } from '@main/config/constants/envs'

export const helmet = helmetMiddleware({ contentSecurityPolicy: !IN_PROD && false })

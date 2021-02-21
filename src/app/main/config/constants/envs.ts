export const { PORT = 4000, SECRET = 'secret123' } = process.env

export const IN_PROD = process.env.NODE_ENV === 'production'

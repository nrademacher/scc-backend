import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

type Config = {
    PORT: number
    TOKEN_SECRET: string
}

export const config: Config = {
    PORT: Number(process.env.PORT) || 4000,
    TOKEN_SECRET: process.env.JWT_SECRET || 'jwt-dev-secret',
}

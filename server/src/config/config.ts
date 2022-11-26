import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = (process.env.MONGO_URL) ?? ''
const SERVER_PORT = (process.env.SERVER_PORT) ? Number(process.env.SERVER_PORT) : 9999
const ACCESS_TOEKN_SECRET = (process.env.ACCESS_TOEKN_SECRET) ?? ''
const REFRESH_TOEKN_SECRET = (process.env.REFRESH_TOEKN_SECRET) ?? ''
const ACCESS_TOKEN_DURATION = '1m'

export default {
  mongo: {
    dbUrl: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  },
  token: {
    accessSecret: ACCESS_TOEKN_SECRET,
    refreshSecret: REFRESH_TOEKN_SECRET,
    accessTokenDuration: ACCESS_TOKEN_DURATION
  }

}

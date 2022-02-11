export default {
  mongoUrl:
  process.env.MONGO_URL || 'mongodb://localhost:27017/clean-typescript-api',
  port: process.env.PORT || 8080,
  jwt: process.env.JWT_SECRET || 'Hj67==5H'
}

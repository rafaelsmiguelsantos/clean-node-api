export default {
  mongoUrl:
  process.env.MONGO_URL || 'mongodb://localhost:27017/clean-typescript-api',
  port: process.env.PORT || 8080,
  jwt: process.env.JWT_SECRET || 'tj67O==5H'
}

import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app).post('/api/signup').send({
      name: 'Rafael',
      email: 'rafael@gmail.com',
      password: '123',
      passwwordConfirmation: '123'
    }).expect(200)
  })
})

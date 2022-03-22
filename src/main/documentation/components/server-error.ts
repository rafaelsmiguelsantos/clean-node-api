export const serverError = {
  description: 'Ocorreu um problema no Servidor',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}

export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    percent: {
      type: 'number'
    },
    count: {
      type: 'number'
    }
  },
  required: ['answer', 'count', 'percent']
}

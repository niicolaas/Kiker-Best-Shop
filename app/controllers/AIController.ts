import type { HttpContext } from '@adonisjs/core/http'
import ProductService from '#services/productService'
import { inject } from '@adonisjs/core'

@inject()
export default class AIController {
  constructor(protected productService: ProductService) {}

  async chat({ request, response }: HttpContext) {
    const { question } = request.only(['question'])

    if (!question || question.lenght < 3) {
      return response.badRequest({
        message: 'Por favor, envie uma pergunta válida para o assistente.',
      })
    }

    try {
      const data = await this.productService.executeAssistent(question)

      return response.ok({
        status: 'success',
        answer: data.answer,
        products: data.products,
      })
    } catch (error) {
      console.error('Erro no AIController:', error)
      return response.internalServerError({
        message: 'Ocorreu um erro ao processar a pergunta. Tente novamente...',
      })
    }
  }
}

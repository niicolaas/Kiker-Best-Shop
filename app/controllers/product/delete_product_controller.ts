import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteProductController {
  async delete({ request, response }: HttpContext) {
    const payload = request.params()

    const productExists = await Product.find(payload.id)

    if (!productExists) return response.status(404).send({ error: 'Produto não encontrado!' })

    await productExists.delete()

    response.status(200).send({ message: 'Produto deletado com sucesso!' })
  }
}

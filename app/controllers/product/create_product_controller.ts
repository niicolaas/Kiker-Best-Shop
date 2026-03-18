import Product from '#models/product'
import { product_validator } from '#validators/product_validator'
import type { HttpContext } from '@adonisjs/core/http'
import HuggingFaceService from '#services/huggingFaceService'

export default class CreateProductController {
  async create({ request, response }: HttpContext) {
    const huggingFaceService = new HuggingFaceService()

    const payload = await request.validateUsing(product_validator)

    const productExists = await Product.findBy('name', payload.name)

    if (productExists)
      return response.status(409).send({ error: 'Um produto com este nome já existe!' })

    const context = `${payload.name}: ${payload.description}`
    const vector = await huggingFaceService.generateEmbedding(context)

    payload.embedding = JSON.stringify(vector)

    const pendingProduct = await Product.create(payload)

    if (!pendingProduct) response.status(400).send('Error to create the product')

    response.status(201).send({ message: 'Product created with success!', product: pendingProduct })
  }
}

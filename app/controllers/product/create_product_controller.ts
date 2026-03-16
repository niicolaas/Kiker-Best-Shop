import Product from '#models/product'
import { product_validator } from '#validators/product_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateProductController {
  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(product_validator)

    const pendingCreateProduct = await Product.create(payload)

    if (!pendingCreateProduct) response.status(400).send('Error to create the product')

    response.status(200).send('Product created with success!')
  }
}

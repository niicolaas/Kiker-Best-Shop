import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class FindManyProductController {
  async findMany({ response }: HttpContext) {
    const products = await Product.all()

    if (!products) response.status(404).send({ error: 'No products found!' })

    response.status(200).send({ message: 'Products retrieved with success!', products })
  }
}

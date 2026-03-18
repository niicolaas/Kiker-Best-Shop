import cartitem from '#models/cartitem'
import { cart_item_validator } from '#validators/cart_item_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class AddCartItemController {
  async create({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(cart_item_validator)

    const cart_item_exists = await cartitem
      .query()
      .where({
        user_id: user.id,
        product_id: payload.product_id,
      })
      .first()

    if (cart_item_exists) {
      cart_item_exists.amount += payload.amount

      await cart_item_exists.save()

      return response
        .status(200)
        .send({ message: 'Quantidade atualizada no carrinho com sucesso!', data: cart_item_exists })
    }

    const new_cart_item = await cartitem.create({ ...payload, user_id: user.id })

    return response
      .status(201)
      .send({ message: 'Produto adicionado ao carrinho com sucesso!', data: new_cart_item })
  }
}

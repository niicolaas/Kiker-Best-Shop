import vine from '@vinejs/vine'

export const cart_item_validator = vine.create({
  product_id: vine.number(),
  amount: vine.number(),
})

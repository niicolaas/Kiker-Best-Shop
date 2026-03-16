import vine from '@vinejs/vine'

export const product_validator = vine.create({
  name: vine.string(),
  price: vine.number(),
  description: vine.string(),
  imgurl: vine.string(),
  embedding: vine.string().nullable(),
})

import { BaseCommand } from '@adonisjs/core/ace'
import Product from '#models/product'
import AiService from '#services/aiService'
import { inject } from '@adonisjs/core'
import { CommandOptions } from '@adonisjs/core/types/ace'

@inject()
export default class SeedProducts extends BaseCommand {
  static commandName = 'db:seed-ai'
  static description = 'Populate db with products and generate A.I vectors'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    this.logger.info('Starting product Seeds with A.I...')

    const aiService = await this.app.container.make(AiService)

    const productsToSeed = [
      {
        name: 'Tênis Running Pro Max',
        price: '429.90',
        description: 'Melhor custo-benefício para corridas leves e alto amortecimento.',
        imgurl: '/images/running.png',
      },
      {
        name: 'Bota Adventure X',
        price: '580.00',
        description: 'Resistente a água, ideal para trilhas pesadas e terrenos rochosos.',
        imgurl: '/images/bota.png',
      },
      {
        name: 'Tênis Street Comfort Plus',
        price: '299.00',
        description: 'Estilo urbano com palmilha de gel para o dia a dia.',
        imgurl: '/images/street.png',
      },
    ]

    for (const item of productsToSeed) {
      try {
        this.logger.info(`Generating Vector for: ${item.name}`)

        const context = `${item.name}: ${item.description}`
        const vector = await aiService.generateEmbedding(context)

        await Product.create({
          name: item.name,
          price: item.price,
          description: item.description,
          imgurl: item.imgurl,
          embedding: JSON.stringify(vector),
        })

        this.logger.success(`Product ${item.name} saved!`)
      } catch (error: any) {
        this.logger.error(`Error on loading ${item.name}: ${error.message}`)
      }
    }

    this.logger.success('Product Vectorization was made with success!')
  }
}

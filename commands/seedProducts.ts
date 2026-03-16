import { BaseCommand } from '@adonisjs/core/ace'
import Product from '#models/product'
import AiService from '#services/huggingFaceService'
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
        price: 429.9,
        description:
          'Tênis de alta performance específico para corrida de rua, maratonas e exercícios aeróbicos. Possui amortecimento para corredores.',
        imgurl:
          'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSvUmjr6L0dgDbIo1xanTq0JoWXMNiqn7v4c_kyKcf1nFB9q0_c75DSRiV-rZLB53_fHj1Vvm8xnctNKP0ySJa1k5JcUSAxSE14Gnn1tN0YgWYwKA3pZjMHgg',
      },
      {
        name: 'Bota Adventure X',
        price: 580.0,
        description: 'Resistente a água, ideal para trilhas pesadas e terrenos rochosos.',
        imgurl:
          'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSvUmjr6L0dgDbIo1xanTq0JoWXMNiqn7v4c_kyKcf1nFB9q0_c75DSRiV-rZLB53_fHj1Vvm8xnctNKP0ySJa1k5JcUSAxSE14Gnn1tN0YgWYwKA3pZjMHgg',
      },
      {
        name: 'Tênis Street Comfort Plus',
        price: 299.0,
        description: 'Estilo urbano com palmilha de gel para o dia a dia.',
        imgurl:
          'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSvUmjr6L0dgDbIo1xanTq0JoWXMNiqn7v4c_kyKcf1nFB9q0_c75DSRiV-rZLB53_fHj1Vvm8xnctNKP0ySJa1k5JcUSAxSE14Gnn1tN0YgWYwKA3pZjMHgg',
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

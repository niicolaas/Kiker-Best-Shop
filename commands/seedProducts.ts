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
          'Tênis de alta performance. Malha respirável dupla e solado com retorno de energia garantem propulsão máxima, absorção de impacto e suporte ideal para recordes em maratonas e treinos aeróbicos.',
        imgurl:
          'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSvUmjr6L0dgDbIo1xanTq0JoWXMNiqn7v4c_kyKcf1nFB9q0_c75DSRiV-rZLB53_fHj1Vvm8xnctNKP0ySJa1k5JcUSAxSE14Gnn1tN0YgWYwKA3pZjMHgg',
      },
      {
        name: 'Bota Adventure X',
        price: 580.0,
        description:
          'Domine qualquer terreno. 100% impermeável, costuras seladas e solado tratorado de alta tração. Garante estabilidade e segurança em trilhas pesadas, superfícies rochosas ou lamacentas, com total conforto.',
        imgurl: 'https://imgnike-a.akamaihd.net/360x360/109476IEA5.jpg',
      },
      {
        name: 'Tênis Street Comfort Plus',
        price: 299.0,
        description:
          'Estilo urbano contemporâneo e conforto absoluto. Palmilha de gel com memória inteligente que absorve o impacto da caminhada. Escolha definitiva para quem passa longas horas em pé no dia a dia.',
        imgurl: 'https://imgnike-a.akamaihd.net/360x360/111058IGA1.jpg',
      },
      {
        name: 'Tênis Cross Training Elite',
        price: 489.9,
        description:
          'Estabilidade inabalável para força e crossfit. Base plana, suporte lateral e calcanhar rígido garantem a postura correta e a firmeza necessária para levantamento de peso na academia.',
        imgurl: 'https://imgnike-a.akamaihd.net/360x360/109503IDAA.jpg',
      },
      {
        name: 'Chuteira Field Master Pro',
        price: 349.9,
        description:
          'Maximize seu desempenho. Cabedal texturizado para controle preciso e travas estrategicamente posicionadas. Proporciona aceleração explosiva e cortes rápidos em gramados naturais.',
        imgurl: 'https://imgnike-a.akamaihd.net/360x360/11019615A1.jpg',
      },
      {
        name: 'Sapatilha Lifestyle Minimalist',
        price: 259.9,
        description:
          'Design limpo e sofisticado. Feita em couro sintético premium de fácil limpeza, é a peça coringa que oferece leveza e praticidade para a rotina agitada da cidade.',
        imgurl: 'https://imgnike-a.akamaihd.net/360x360/10976515A2.jpg',
      },
      {
        name: 'Tênis Basketball Aero-Fly',
        price: 599.9,
        description:
          'Proteção superior e amortecimento responsivo. Padrão de tração multidirecional no solado impede escorregões em mudanças bruscas de direção, garantindo saltos seguros nas quadras.',
        imgurl: 'https://imgnike-a.akamaihd.net/360x360/11122115A1.jpg',
      },
      {
        name: 'Slip-On Easy Walk',
        price: 199.9,
        description:
          'Praticidade sem cadarços. Calce fácil e cabedal em knit super elástico e respirável. A opção mais confortável e ágil para viagens, caminhadas leves e compromissos casuais.',
        imgurl: 'https://imgnike-a.akamaihd.net/360x360/11016615A1.jpg',
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

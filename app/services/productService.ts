import db from '@adonisjs/lucid/services/db'
import { inject } from '@adonisjs/core'
import HuggingFaceService from './huggingFaceService.ts'
import GeminiService from './geminiService.ts'

@inject()
export default class ProductService {
  constructor(
    protected huggingFaceService: HuggingFaceService,
    protected geminiService: GeminiService
  ) {}

  async executeAssistent(question: string) {
    const queryVector = await this.huggingFaceService.generateEmbedding(question)
    const vectorString = JSON.stringify(queryVector)

    const relatedProducts = await db.rawQuery(
      `
      SELECT name, description, price, imgurl, 1 - (embedding <=> ?::vector) AS similarity
      FROM products
      WHERE 1 - (embedding <=> ?::vector) > 0.3
      ORDER BY embedding <=> ?::vector
      LIMIT 3
    `,
      [vectorString, vectorString, vectorString]
    )

    const context = relatedProducts.rows
      .map((p: any) => `Producto: ${p.name} | Preço: ${p.price} | Descrição: ${p.description}`)
      .join('\n')

    const answer = await this.geminiService.generateAnswer(question, context)

    return {
      answer,
      products: relatedProducts.rows,
    }
  }
}

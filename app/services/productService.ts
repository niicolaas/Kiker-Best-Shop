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
    // Generate the query
    const queryVector = await this.huggingFaceService.generateEmbedding(question)
    // Transform the query in to a JSON STRING
    const vectorString = JSON.stringify(queryVector)

    // Search the related products
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

    interface ProductQueryResult {
      name: string
      description: string
      price: number
      imgurl: string
      similarity: number
    }

    const context = (relatedProducts.rows as ProductQueryResult[])
      .map((p: any) => `Producto: ${p.name} | Preço: ${p.price} | Descrição: ${p.description}`)
      .join('\n')

    const answer = await this.geminiService.generateAnswer(question, context)

    return {
      answer,
      products: relatedProducts.rows,
    }
  }
}

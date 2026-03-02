import { GoogleGenerativeAI } from '@google/generative-ai'
import env from '#start/env'

export default class GeminiService {
  private gemini = new GoogleGenerativeAI(env.get('GEMINI_API_KEY') || `SEM KEY`)

  async generateAnswer(question: string, context: string) {
    const model = this.gemini.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `Você é o assistente virtual da Kiker Shop. 
          Sua função é ajudar os clientes a escolherem produtos.
          Use EXCLUSIVAMENTE o seguinte contexto de produtos encontrados no banco de dados para basear sua resposta.
          Se a resposta não estiver no contexto, diga gentilmente que não temos essa informação no momento.
          Contexto: ${context}`,
    })

    const result = await model.generateContent(question)

    return result.response.text()
  }
}

import env from '#start/env'
import { HfInference } from '@huggingface/inference'

export default class HuggingFaceService {
  private hfToken = env.get('HUGGING_FACE_TOKEN')
  private model = 'sentence-transformers/all-MiniLM-L6-v2'

  private hf = new HfInference(this.hfToken)

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const output = await this.hf.featureExtraction({
        model: this.model,
        inputs: text,
      })

      if (Array.isArray(output) && Array.isArray(output[0])) {
        return output[0] as number[]
      }

      return output as number[]
    } catch (error: any) {
      throw new Error(`Hugging Face Error: ${error.message}`)
    }
  }
}

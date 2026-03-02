import { BrainCircuit } from "lucide-react"

type ProductSuggestion = {
  name: string
  description?: string
  price: string
  imgurl?: string
  similarity?: number
}

type ProductSuggestionsRowProps = {
  products: ProductSuggestion[]
}

export function ProductSuggestionsRow({ products }: ProductSuggestionsRowProps) {
  const formatPrice = (price: string) => {
    const value = Number(price)

    if (Number.isNaN(value)) {
      return price
    }

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const getRelevance = (product: ProductSuggestion) => {
    if (typeof product.similarity === "number") {
      return Math.round(product.similarity * 100)
    }

    return undefined
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-xs font-medium text-gray-300 flex items-center gap-1">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-900 text-purple-200">
          <BrainCircuit className="h-3 w-3" />
        </span>
        Resultados relacionados ao seu catálogo
      </p>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {products.map((product, index) => {
          const relevance = getRelevance(product)

          return (
            <div
              key={`${product.name}-${index}`}
              className="flex w-72 shrink-0 items-center gap-3 rounded-xl border border-gray-700 bg-gray-800 px-3 py-3 shadow-sm"
            >
              <div className="h-16 w-16 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 text-[11px]">
                IMG
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-gray-100 line-clamp-2">
                  {product.name}
                </p>
                <p className="text-xs font-medium text-purple-300">
                  {formatPrice(product.price)}
                </p>
                {product.description && (
                  <p className="text-[11px] text-gray-300 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-1">
                  {relevance !== undefined && (
                    <span className="inline-flex items-center rounded-full border border-emerald-500 bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                      Relevância: {relevance}%
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400 ml-auto">
                    Rank RAG · Top 3
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
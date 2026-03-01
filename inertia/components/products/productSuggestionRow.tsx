import { BrainCircuit } from "lucide-react"

export function ProductSuggestionsRow() {
    const products = [
      {
        id: 1,
        name: "Tênis Running Pro Max",
        price: "R$ 429,90",
        relevance: 92,
      },
      {
        id: 2,
        name: "Tênis Street Comfort Plus",
        price: "R$ 379,90",
        relevance: 89,
      },
      {
        id: 3,
        name: "Tênis Performance Elite",
        price: "R$ 512,00",
        relevance: 94,
      },
    ]
  
    return (
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs font-medium text-gray-300 flex items-center gap-1">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-900 text-purple-200">
            <BrainCircuit className="h-3 w-3" />
          </span>
          Resultados relacionados ao seu catálogo
        </p>
  
        <div className="flex gap-3 overflow-x-auto pb-1">
          {products.map((product) => (
            <div
              key={product.id}
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
                  {product.price}
                </p>
  
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full border border-emerald-500 bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Relevância: {product.relevance}%
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Rank RAG · Top 3
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
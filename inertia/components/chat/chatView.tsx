import { Send, Settings2 } from "lucide-react";
import { ProductSuggestionsRow } from "../products/productSuggestionRow";
import { Button } from "../ui/button";
import { ChatMessageAI } from "./chatMessageAI";
import { ChatMessageUser } from "./chatMessageUser";

export function RAGChatView() {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 bg-gray-900">
            <div className="w-full space-y-4">
              <ChatMessageUser
                content="Me mostre os tênis mais vendidos na última semana com foco em ticket médio acima de R$ 300."
              />
              <ChatMessageAI
                content="Encontrei alguns produtos altamente relevantes para o seu critério. Todos acima de R$ 300 e com alta taxa de conversão na última semana."
              />
              <div className="flex justify-start">
                <ProductSuggestionsRow />
              </div>
            </div>
          </div>
        </div>
  
        <div className="border-t border-gray-800 bg-gray-900 px-6 py-3">
          <div className="w-full">
            <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-3 py-2 shadow-sm">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <Settings2 className="h-4 w-4" />
                <span className="sr-only">Ajustes de prompt</span>
              </Button>
  
              <input
                type="text"
                placeholder="Faça uma pergunta sobre seus produtos, catálogo ou vendas..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 text-gray-100"
              />
  
              <Button
                type="button"
                size="icon"
                className="h-9 w-9 rounded-full bg-gray-700 hover:bg-gray-600 text-white shadow"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Enviar mensagem</span>
              </Button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400 text-center">
              A IA utiliza RAG sobre seu catálogo vetorizado para garantir respostas contextualizadas.
            </p>
          </div>
        </div>
      </div>
    )
  }
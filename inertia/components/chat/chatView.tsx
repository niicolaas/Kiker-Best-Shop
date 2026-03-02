import { useEffect, useState } from "react"
import { Send, Settings2 } from "lucide-react"
import { ProductSuggestionsRow } from "../products/productSuggestionRow"
import { Button } from "../ui/button"
import { ChatMessageAI } from "./chatMessageAI"
import { ChatMessageUser } from "./chatMessageUser"

type ChatRole = "user" | "assistant"

type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  products?: {
    name: string
    description: string
    price: string
    imgurl?: string
    similarity?: number
  }[]
}

const STORAGE_KEY = "rag_chat_conversation"

export function RAGChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChatMessage[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
          return
        }
      } catch {
        // ignore parse errors and fall back to default welcome message
      }
    }

    const welcomeMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Olá! Eu sou o assistente de vendas da Kiker. Em que posso te ajudar hoje com seus produtos ou catálogo?",
    }

    setMessages([welcomeMessage])
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!messages.length) return

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const sendMessage = async () => {
    const question = input.trim()
    if (!question || isLoading) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3333/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error("Erro ao se comunicar com o assistente.")
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          data?.answer ??
          "Tive um problema para entender a resposta da API. Tente novamente em alguns instantes.",
        products: Array.isArray(data?.products) ? data.products : undefined,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Não consegui falar com o assistente agora. Verifique se a API em `localhost:3333/chat` está rodando e tente novamente.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-4 bg-gray-900">
          <div className="w-full space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                {message.role === "user" ? (
                  <ChatMessageUser content={message.content} />
                ) : (
                  <>
                    <ChatMessageAI content={message.content} />
                    {message.products && message.products.length > 0 && (
                      <div className="flex justify-start">
                        <ProductSuggestionsRow products={message.products} />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="w-full max-w-5xl flex items-start gap-2">
                  <div className="h-7 w-7 rounded-full border border-purple-700 bg-purple-500 flex items-center justify-center text-[11px] text-purple-100">
                    AI
                  </div>
                  <div className="rounded-2xl rounded-bl-sm bg-purple-800 border border-purple-700 px-4 py-3 text-sm text-purple-100 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-200 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-purple-200 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-purple-200 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />

            <Button
              type="button"
              size="icon"
              className="h-9 w-9 rounded-full bg-gray-700 hover:bg-gray-600 text-white shadow disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
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
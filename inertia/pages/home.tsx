import { useCallback, useEffect, useState } from 'react'
import { BrainCircuit, Database, ListTree, Settings2, ShoppingCart } from 'lucide-react'
import { SidebarItem } from '@/components/sidebar/sideBarItem'
import { RAGChatView } from '@/components/chat/chatView'
import Product from '#models/product'

export default function Home() {
  const [activeView, setActiveView] = useState<
    'rag' | 'mycart' | 'knowledge' | 'logs' | 'settings'
  >('rag')

  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const fetchProduct = useCallback(async () => {
    console.log('test')
    setIsLoading(true)
    try {
      const response = await fetch('/findProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Failed to fetch products')

      const data = await response.json()

      setProducts(Array.isArray(data?.products) ? data.products : [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const viewConfig: Record<
    'rag' | 'mycart' | 'knowledge' | 'logs' | 'settings',
    { title: string; subtitle: string }
  > = {
    rag: {
      title: 'Conversa · Assistente de Vendas',
      subtitle: 'Otimize respostas usando RAG em tempo real',
    },
    mycart: {
      title: 'Meu carrinho · Veja seu carrinho',
      subtitle: 'Observe seu carrinho',
    },
    knowledge: {
      title: 'Base de Conhecimento · Produtos',
      subtitle: 'Gerencie o catálogo vetorizado utilizado pelo assistente de vendas',
    },
    logs: {
      title: 'Logs de Busca Vetorial',
      subtitle: 'Acompanhe como o mecanismo RAG está buscando e ranqueando os produtos',
    },
    settings: {
      title: 'Configurações do Assistente',
      subtitle: 'Ajuste o comportamento, temperatura e prompts do seu assistente RAG',
    },
  }

  const { title, subtitle } = viewConfig[activeView]

  return (
    <>
      <div className="min-h-screen flex bg-gray-900 text-gray-100">
        {/* SIDEBAR */}
        <aside className="w-72 shrink-0 border-r border-gray-800 bg-gray-800 flex flex-col">
          {/* Logo / Título */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
            <div className="h-9 w-9 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-sm">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-purple-500">Kiker Shop</p>
              <p className="text-xs text-white">Assistente de Vendas com IA</p>
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex-1 px-3 py-4 space-y-2 text-sm">
            <p className="px-2 text-[11px] uppercase tracking-wide text-gray-400">Navegação</p>
            <SidebarItem
              icon={BrainCircuit}
              label="Conversar com o Assistente"
              active={activeView === 'rag'}
              onClick={() => setActiveView('rag')}
            />
            <SidebarItem
              icon={ShoppingCart}
              label="Meu carrinho"
              active={activeView === 'mycart'}
              onClick={() => setActiveView('mycart')}
            />
            <SidebarItem
              icon={Database}
              label="Base de Conhecimento (Produtos)"
              active={activeView === 'knowledge'}
              onClick={() => setActiveView('knowledge')}
            />
            <SidebarItem
              icon={ListTree}
              label="Logs de Busca Vetorial"
              active={activeView === 'logs'}
              onClick={() => setActiveView('logs')}
            />
            <SidebarItem
              icon={Settings2}
              label="Configurações"
              active={activeView === 'settings'}
              onClick={() => setActiveView('settings')}
            />
          </nav>

          {/* Card de Status Inferior */}
          <div className="px-4 pb-5 pt-2">
            <div className="rounded-xl border border-purple-100 bg-purple-50/80 px-4 py-3">
              <p className="text-xs font-medium text-purple-900">Catálogo Vetorizado</p>
              <p className="mt-1 text-lg font-semibold text-purple-700">{products.length} itens</p>
              <p className="mt-1 text-[11px] text-purple-700/80">Atualizado há 5 minutos</p>
            </div>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <section className="flex-1 flex flex-col bg-gray-900">
          {/* Cabeçalho */}
          <header className="px-6 py-4 border-b border-gray-800 bg-gray-900">
            <div className="w-full flex items-center justify-between gap-4">
              <div>
                <h1 className="text-lg font-semibold text-purple-200">{title}</h1>
                <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>
              </div>

              <span className="inline-flex items-center rounded-full border border-purple-700 bg-purple-900 text-[11px] font-medium text-purple-100 px-3 py-1">
                Powered by AdonisJS v6
              </span>
            </div>
          </header>

          {activeView === 'rag' && <RAGChatView />}
          {activeView === 'knowledge' && <KnowledgeBaseView />}
          {activeView === 'logs' && <LogsView />}
          {activeView === 'settings' && <SettingsView />}
        </section>
      </div>
    </>
  )
}

function KnowledgeBaseView() {
  return (
    <div className="flex-1 flex flex-col px-6 py-6">
      <div className="w-full space-y-4">
        <p className="text-sm text-gray-200">
          Aqui você poderá gerenciar os produtos que alimentam o seu catálogo vetorizado.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-gray-800 p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-300">Resumo do Catálogo</p>
            <p className="mt-2 text-2xl font-semibold text-purple-300">1.245 itens</p>
            <p className="mt-1 text-[11px] text-gray-400">Última vetorização há 5 minutos</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-800 p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-300">Novos produtos</p>
            <p className="mt-2 text-2xl font-semibold text-gray-100">32</p>
            <p className="mt-1 text-[11px] text-gray-400">Aguardando vetorização</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-800 p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-300">Fontes de dados</p>
            <p className="mt-2 text-sm text-gray-100">ERP · Planilhas · Integrações API</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LogsView() {
  return (
    <div className="flex-1 flex flex-col px-6 py-6">
      <div className="w-full space-y-4">
        <p className="text-sm text-gray-200">
          Visão geral das últimas buscas vetoriais realizadas pelo assistente.
        </p>
        <div className="rounded-xl border border-gray-800 bg-gray-800 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Consulta</span>
            <span>Itens retornados</span>
            <span>Relevância média</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-lg bg-gray-900 px-3 py-2">
              <span className="truncate mr-4">Tênis para corrida acima de R$ 300</span>
              <span>12</span>
              <span className="font-semibold text-emerald-400">91%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-900 px-3 py-2">
              <span className="truncate mr-4">Tênis casual masculino conforto</span>
              <span>9</span>
              <span className="font-semibold text-emerald-400">88%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="flex-1 flex flex-col px-6 py-6">
      <div className="w-full space-y-4">
        <p className="text-sm text-gray-200">
          Base para configurar o comportamento do assistente. Aqui você poderá definir opções como
          temperatura, tom de voz e prompts do sistema.
        </p>
        <div className="rounded-xl border border-gray-800 bg-gray-800 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-200">Temperatura do modelo</span>
            <span className="text-xs text-gray-400">Padrão: 0.7</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-200">Modo de resposta</span>
            <span className="text-xs text-gray-400">Vendas orientadas a ticket médio</span>
          </div>
        </div>
      </div>
    </div>
  )
}

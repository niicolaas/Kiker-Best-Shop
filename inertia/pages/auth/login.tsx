import { Form } from '@adonisjs/inertia/react'
import { ShoppingCart, Lock, Mail } from 'lucide-react'

export default function Login() {
  return (
    /* Adicionamos 'fixed inset-0' e 'z-[999]' para garantir que o login 
       fique por cima de qualquer layout de dashboard e ocupe a tela toda.
    */
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 text-gray-100 overflow-y-auto">
      <div className="w-full max-w-md p-4 space-y-8">
        {/* LOGO & TÍTULO */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-lg mb-4">
            <ShoppingCart className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Kiker Shop</h1>
          <p className="mt-2 text-sm text-gray-400">
            Entre com suas credenciais para acessar o painel RAG
          </p>
        </div>

        {/* CARD DO FORMULÁRIO */}
        <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-xl">
          <Form route="session.store">
            {({ errors, processing }) => (
              <div className="space-y-6">
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2"
                  >
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full pl-10 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2.5 outline-none"
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-xs text-red-400 mt-1">{errors.email}</span>
                  )}
                </div>

                {/* SENHA */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2"
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block w-full pl-10 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2.5 outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3 px-4 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all disabled:opacity-50"
                >
                  {processing ? 'Carregando...' : 'Login'}
                </button>
              </div>
            )}
          </Form>
        </div>

        <p className="text-center text-sm text-gray-400">
          Não tem uma conta?{' '}
          <a href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
            Criar conta
          </a>
        </p>

        <p className="text-center text-xs text-gray-500">Powered by AdonisJS v6 & RAG Engine</p>
      </div>
    </div>
  )
}

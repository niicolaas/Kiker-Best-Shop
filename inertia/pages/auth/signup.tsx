import { Form } from '@adonisjs/inertia/react'
import { ShoppingCart, Lock, Mail, User, ShieldCheck } from 'lucide-react'

export default function Signup() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 text-gray-100 overflow-y-auto p-4">
      <div className="w-full max-w-md my-8 space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-lg mb-4">
            <ShoppingCart className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Criar Conta</h1>
          <p className="mt-2 text-sm text-gray-400">
            Junte-se ao Kiker Shop e turbine suas vendas com IA
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-xl">
          <Form route="new_account.store">
            {({ errors, processing }) => (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5"
                  >
                    Nome Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="block w-full pl-10 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2.5 outline-none transition-all"
                      placeholder="João Silva"
                      data-invalid={errors.fullName ? 'true' : undefined}
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5"
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
                      autoComplete="email"
                      className="block w-full pl-10 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2.5 outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5"
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
                      autoComplete="new-password"
                      className="block w-full pl-10 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2.5 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.password}</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="passwordConfirmation"
                    className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5"
                  >
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <input
                      type="password"
                      name="passwordConfirmation"
                      id="passwordConfirmation"
                      autoComplete="new-password"
                      className="block w-full pl-10 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2.5 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.passwordConfirmation && (
                    <span className="text-xs text-red-400 mt-1 block">
                      {errors.passwordConfirmation}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:opacity-50 transition-all mt-4"
                >
                  {processing ? 'Criando conta...' : 'Cadastrar agora'}
                </button>
              </div>
            )}
          </Form>
        </div>

        <p className="text-center text-sm text-gray-400">
          Já tem uma conta?{' '}
          <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            Entrar
          </a>
        </p>

        <p className="text-center text-xs text-gray-500">Powered by AdonisJS v6 & RAG Engine</p>
      </div>
    </div>
  )
}

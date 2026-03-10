'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard() {
 const router = useRouter();
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const handleLogout = () => {
  router.push('/');
 };

 const menuOptions = [
  {
   id: 'pactos',
   title: 'Pactos e Acordos',
   description: 'Criar e gerenciar pactos entre setores',
   icon: '🤝',
   color: 'bg-blue-500 hover:bg-blue-600',
   route: '/pactuacao/pactos'
  },
  {
   id: 'metas',
   title: 'Metas e Indicadores',
   description: 'Acompanhar metas e KPIs dos pactos',
   icon: '📊',
   color: 'bg-green-500 hover:bg-green-600',
   route: '/pactuacao/metas'
  },
  {
   id: 'setores',
   title: 'Setores',
   description: 'Gerenciar setores e departamentos',
   icon: '🏢',
   color: 'bg-purple-500 hover:bg-purple-600',
   route: '/pactuacao/setores'
  },
  {
   id: 'dashboard-indicadores',
   title: 'Dashboard de Indicadores',
   description: 'Visualizar desempenho geral',
   icon: '📈',
   color: 'bg-orange-500 hover:bg-orange-600',
   route: '/pactuacao/dashboard'
  }
 ];

 return (
  <div className="min-h-screen bg-gray-50">
   {/* Header */}
   <header className="bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center h-16">
      <div className="flex items-center">
       <h1 className="text-2xl font-bold text-gray-900">
        Sistema de Pactuação
       </h1>
      </div>
      
      {/* Desktop menu */}
      <div className="hidden md:block">
       <button
        onClick={handleLogout}
        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
       >
        Sair
       </button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
       <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-500 hover:text-gray-700  p-2"
       >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
       </button>
      </div>
     </div>
    </div>

    {/* Mobile menu */}
    {isMenuOpen && (
     <div className="md:hidden border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
       <button
        onClick={handleLogout}
        className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
       >
        Sair
       </button>
      </div>
     </div>
    )}
   </header>

   {/* Main Content */}
   <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="px-4 py-6 sm:px-0">
     {/* Welcome section */}
     <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
       Bem-vindo ao Sistema
      </h2>
      <p className="text-gray-600 ">
       Escolha uma das opções abaixo para começar:
      </p>
     </div>

     {/* Options Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {menuOptions.map((option) => (
       <div
        key={option.id}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
       >
        <button
         onClick={() => router.push(option.route)}
         className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
        >
         <div className="flex items-center mb-4">
          <div className={`${option.color} text-white p-3 rounded-lg mr-4 text-2xl`}>
           {option.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 ">
           {option.title}
          </h3>
         </div>
         <p className="text-gray-600 text-sm leading-6">
          {option.description}
         </p>
         <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium">
          Acessar
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
         </div>
        </button>
       </div>
      ))}
     </div>

     {/* Additional info section for mobile */}
     <div className="mt-12 lg:hidden">
      <div className="bg-blue-50 rounded-lg p-6">
       <h3 className="text-lg font-medium text-blue-900 mb-2">
        💡 Dica
       </h3>
       <p className="text-blue-800 text-sm">
        Esta aplicação é otimizada para uso em dispositivos móveis. Toque nas opções acima para navegar pelo sistema.
       </p>
      </div>
     </div>
    </div>
   </main>

   {/* Footer */}
   <footer className="bg-white border-t border-gray-200 mt-12">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
     <p className="text-center text-gray-500 text-sm">
      © 2024 Sistema de Pactuação Interna - Gestão de Acordos entre Setores
     </p>
    </div>
   </footer>
  </div>
 );
}
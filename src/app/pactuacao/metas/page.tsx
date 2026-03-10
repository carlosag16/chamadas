'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Meta {
  id: number;
  pactoId: number;
  pactoTitulo: string;
  indicador: string;
  valorAtual: number;
  valorMeta: number;
  unidade: string;
  prazo: string;
  setor: string;
  responsavel: string;
  status: 'No Prazo' | 'Atenção' | 'Atrasado' | 'Concluído';
}

export default function MetasPage() {
  const router = useRouter();
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [filtroSetor, setFiltroSetor] = useState<string>('Todos');
  const [ordenacao, setOrdenacao] = useState<'prazo' | 'progresso' | 'pacto'>('prazo');

  // Mock data
  const metas: Meta[] = [
    {
      id: 1,
      pactoId: 1,
      pactoTitulo: 'Pacto de Implementação de Sistema de Qualidade',
      indicador: 'Documentos mapeados',
      valorAtual: 45,
      valorMeta: 100,
      unidade: '%',
      prazo: '2024-03-30',
      setor: 'Qualidade',
      responsavel: 'Maria Santos',
      status: 'Atenção'
    },
    {
      id: 2,
      pactoId: 1,
      pactoTitulo: 'Pacto de Implementação de Sistema de Qualidade',
      indicador: 'Treinamentos realizados',
      valorAtual: 8,
      valorMeta: 20,
      unidade: 'qtd',
      prazo: '2024-05-30',
      setor: 'Qualidade',
      responsavel: 'Maria Santos',
      status: 'No Prazo'
    },
    {
      id: 3,
      pactoId: 1,
      pactoTitulo: 'Pacto de Implementação de Sistema de Qualidade',
      indicador: 'Não conformidades resolvidas',
      valorAtual: 15,
      valorMeta: 30,
      unidade: 'qtd',
      prazo: '2024-06-15',
      setor: 'Qualidade',
      responsavel: 'Maria Santos',
      status: 'No Prazo'
    },
    {
      id: 4,
      pactoId: 2,
      pactoTitulo: 'Pacto de Redução de Custos Operacionais',
      indicador: 'Redução de custos',
      valorAtual: 5,
      valorMeta: 15,
      unidade: '%',
      prazo: '2024-12-31',
      setor: 'Operações',
      responsavel: 'Ana Paula Lima',
      status: 'Atrasado'
    },
    {
      id: 5,
      pactoId: 2,
      pactoTitulo: 'Pacto de Redução de Custos Operacionais',
      indicador: 'Processos otimizados',
      valorAtual: 12,
      valorMeta: 40,
      unidade: 'qtd',
      prazo: '2024-10-30',
      setor: 'Operações',
      responsavel: 'Ana Paula Lima',
      status: 'Atenção'
    },
    {
      id: 6,
      pactoId: 4,
      pactoTitulo: 'Pacto de Treinamento e Desenvolvimento',
      indicador: 'Colaboradores treinados',
      valorAtual: 145,
      valorMeta: 350,
      unidade: 'pessoas',
      prazo: '2024-12-20',
      setor: 'RH',
      responsavel: 'Roberta Costa',
      status: 'No Prazo'
    },
    {
      id: 7,
      pactoId: 4,
      pactoTitulo: 'Pacto de Treinamento e Desenvolvimento',
      indicador: 'Horas de treinamento',
      valorAtual: 580,
      valorMeta: 2000,
      unidade: 'horas',
      prazo: '2024-12-20',
      setor: 'RH',
      responsavel: 'Roberta Costa',
      status: 'Atenção'
    },
    {
      id: 8,
      pactoId: 4,
      pactoTitulo: 'Pacto de Treinamento e Desenvolvimento',
      indicador: 'Satisfação com treinamentos',
      valorAtual: 8.5,
      valorMeta: 9.0,
      unidade: 'nota',
      prazo: '2024-12-20',
      setor: 'RH',
      responsavel: 'Roberta Costa',
      status: 'No Prazo'
    },
    {
      id: 9,
      pactoId: 5,
      pactoTitulo: 'Pacto de Sustentabilidade Ambiental',
      indicador: 'Redução consumo energia',
      valorAtual: 22,
      valorMeta: 20,
      unidade: '%',
      prazo: '2024-04-30',
      setor: 'Facilities',
      responsavel: 'Sandra Alves',
      status: 'Concluído'
    },
    {
      id: 10,
      pactoId: 5,
      pactoTitulo: 'Pacto de Sustentabilidade Ambiental',
      indicador: 'Aumento reciclagem',
      valorAtual: 55,
      valorMeta: 50,
      unidade: '%',
      prazo: '2024-04-30',
      setor: 'Facilities',
      responsavel: 'Sandra Alves',
      status: 'Concluído'
    }
  ];

  const setoresDisponiveis = ['Todos', ...Array.from(new Set(metas.map(m => m.setor)))];

  let metasFiltradas = metas;

  if (filtroStatus !== 'Todos') {
    metasFiltradas = metasFiltradas.filter(m => m.status === filtroStatus);
  }

  if (filtroSetor !== 'Todos') {
    metasFiltradas = metasFiltradas.filter(m => m.setor === filtroSetor);
  }

  // Ordenação
  metasFiltradas = [...metasFiltradas].sort((a, b) => {
    if (ordenacao === 'prazo') {
      return new Date(a.prazo).getTime() - new Date(b.prazo).getTime();
    } else if (ordenacao === 'progresso') {
      const progA = (a.valorAtual / a.valorMeta) * 100;
      const progB = (b.valorAtual / b.valorMeta) * 100;
      return progA - progB;
    } else {
      return a.pactoTitulo.localeCompare(b.pactoTitulo);
    }
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'No Prazo': 'bg-green-100 text-green-800',
      'Atenção': 'bg-yellow-100 text-yellow-800',
      'Atrasado': 'bg-red-100 text-red-800',
      'Concluído': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const calcularProgresso = (valorAtual: number, valorMeta: number) => {
    return Math.min(100, Math.round((valorAtual / valorMeta) * 100));
  };

  const calcularDiasRestantes = (prazo: string) => {
    const hoje = new Date();
    const dataLimite = new Date(prazo);
    const diff = dataLimite.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const estatisticas = {
    total: metas.length,
    noPrazo: metas.filter(m => m.status === 'No Prazo').length,
    atencao: metas.filter(m => m.status === 'Atenção').length,
    atrasadas: metas.filter(m => m.status === 'Atrasado').length,
    concluidas: metas.filter(m => m.status === 'Concluído').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Metas e Indicadores</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.total}</p>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-4">
              <p className="text-sm text-green-700">No Prazo</p>
              <p className="text-2xl font-bold text-green-900">{estatisticas.noPrazo}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow p-4">
              <p className="text-sm text-yellow-700">Atenção</p>
              <p className="text-2xl font-bold text-yellow-900">{estatisticas.atencao}</p>
            </div>
            <div className="bg-red-50 rounded-lg shadow p-4">
              <p className="text-sm text-red-700">Atrasadas</p>
              <p className="text-2xl font-bold text-red-900">{estatisticas.atrasadas}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-4">
              <p className="text-sm text-blue-700">Concluídas</p>
              <p className="text-2xl font-bold text-blue-900">{estatisticas.concluidas}</p>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Todos">Todos</option>
                  <option value="No Prazo">No Prazo</option>
                  <option value="Atenção">Atenção</option>
                  <option value="Atrasado">Atrasado</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
                <select
                  value={filtroSetor}
                  onChange={(e) => setFiltroSetor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {setoresDisponiveis.map(setor => (
                    <option key={setor} value={setor}>{setor}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                <select
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="prazo">Prazo</option>
                  <option value="progresso">Progresso</option>
                  <option value="pacto">Pacto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lista de Metas */}
          <div className="space-y-4">
            {metasFiltradas.map((meta) => {
              const progresso = calcularProgresso(meta.valorAtual, meta.valorMeta);
              const diasRestantes = calcularDiasRestantes(meta.prazo);

              return (
                <div key={meta.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex-1 mb-3 md:mb-0">
                      <h3 className="font-semibold text-gray-900 text-lg">{meta.indicador}</h3>
                      <p className="text-sm text-gray-500">{meta.pactoTitulo}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {meta.setor} | Responsável: {meta.responsavel}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(meta.status)}`}>
                        {meta.status}
                      </span>
                      <button
                        onClick={() => router.push(`/pactuacao/pactos/visualizar/${meta.pactoId}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                      >
                        Ver Pacto
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Progresso</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              progresso >= 100 ? 'bg-green-600' :
                              progresso >= 70 ? 'bg-blue-600' :
                              progresso >= 40 ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}
                            style={{ width: `${progresso}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{progresso}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Valores</p>
                      <p className="text-base font-semibold text-gray-900 mt-1">
                        {meta.valorAtual} / {meta.valorMeta} {meta.unidade}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prazo</p>
                      <p className="text-base font-semibold text-gray-900 mt-1">
                        {new Date(meta.prazo).toLocaleDateString('pt-BR')}
                        {diasRestantes > 0 && (
                          <span className={`ml-2 text-sm ${diasRestantes <= 7 ? 'text-red-600' : 'text-gray-600'}`}>
                            ({diasRestantes} dias)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {metasFiltradas.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">Nenhuma meta encontrada com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

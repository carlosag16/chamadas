'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SetorPerformance {
  setor: string;
  pactosAtivos: number;
  metasConcluidas: number;
  metasTotais: number;
  progressoMedio: number;
}

export default function DashboardIndicadoresPage() {
  const router = useRouter();
  const [periodoSelecionado, setPeriodoSelecionado] = useState<'mes' | 'trimestre' | 'ano'>('mes');

  // Mock data para o dashboard
  const estatisticasGerais = {
    totalPactos: 5,
    pactosAtivos: 3,
    pactosFinalizados: 1,
    pactosEmRevisao: 1,
    totalMetas: 10,
    metasConcluidas: 2,
    metasNoPrazo: 4,
    metasAtrasadas: 1,
    metasAtencao: 3,
    progressoGeral: 56
  };

  const performancePorSetor: SetorPerformance[] = [
    {
      setor: 'Qualidade',
      pactosAtivos: 1,
      metasConcluidas: 0,
      metasTotais: 3,
      progressoMedio: 42
    },
    {
      setor: 'Operações',
      pactosAtivos: 1,
      metasConcluidas: 0,
      metasTotais: 2,
      progressoMedio: 28
    },
    {
      setor: 'RH',
      pactosAtivos: 1,
      metasConcluidas: 0,
      metasTotais: 3,
      progressoMedio: 51
    },
    {
      setor: 'Facilities',
      pactosAtivos: 0,
      metasConcluidas: 2,
      metasTotais: 2,
      progressoMedio: 100
    }
  ];

  const ultimasAtualizacoes = [
    {
      id: 1,
      pacto: 'Pacto de Implementação de Sistema de Qualidade',
      meta: 'Documentos mapeados',
      valorAnterior: 40,
      valorNovo: 45,
      unidade: '%',
      data: '2024-01-18',
      responsavel: 'Maria Santos'
    },
    {
      id: 2,
      pacto: 'Pacto de Treinamento e Desenvolvimento',
      meta: 'Colaboradores treinados',
      valorAnterior: 130,
      valorNovo: 145,
      unidade: 'pessoas',
      data: '2024-01-17',
      responsavel: 'Roberta Costa'
    },
    {
      id: 3,
      pacto: 'Pacto de Redução de Custos Operacionais',
      meta: 'Processos otimizados',
      valorAnterior: 10,
      valorNovo: 12,
      unidade: 'qtd',
      data: '2024-01-16',
      responsavel: 'Ana Paula Lima'
    }
  ];

  const alertas = [
    {
      id: 1,
      tipo: 'prazo',
      titulo: 'Meta próxima do prazo',
      descricao: 'Documentos mapeados - Prazo em 7 dias',
      pacto: 'Pacto de Implementação de Sistema de Qualidade',
      severidade: 'alta'
    },
    {
      id: 2,
      tipo: 'atrasado',
      titulo: 'Meta atrasada',
      descricao: 'Redução de custos - Progresso abaixo do esperado',
      pacto: 'Pacto de Redução de Custos Operacionais',
      severidade: 'alta'
    },
    {
      id: 3,
      tipo: 'atencao',
      titulo: 'Atenção necessária',
      descricao: 'Horas de treinamento - Progresso lento',
      pacto: 'Pacto de Treinamento e Desenvolvimento',
      severidade: 'media'
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard de Indicadores</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPeriodoSelecionado('mes')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  periodoSelecionado === 'mes'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Mês
              </button>
              <button
                onClick={() => setPeriodoSelecionado('trimestre')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  periodoSelecionado === 'trimestre'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Trimestre
              </button>
              <button
                onClick={() => setPeriodoSelecionado('ano')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  periodoSelecionado === 'ano'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Ano
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 space-y-6">
          {/* Visão Geral - Cards Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Pactos Ativos</p>
                  <p className="text-3xl font-bold mt-1">{estatisticasGerais.pactosAtivos}</p>
                  <p className="text-blue-100 text-xs mt-1">de {estatisticasGerais.totalPactos} totais</p>
                </div>
                <div className="text-5xl opacity-20">🤝</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Metas Concluídas</p>
                  <p className="text-3xl font-bold mt-1">{estatisticasGerais.metasConcluidas}</p>
                  <p className="text-green-100 text-xs mt-1">de {estatisticasGerais.totalMetas} totais</p>
                </div>
                <div className="text-5xl opacity-20">✓</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Metas em Atenção</p>
                  <p className="text-3xl font-bold mt-1">{estatisticasGerais.metasAtencao}</p>
                  <p className="text-yellow-100 text-xs mt-1">requerem atenção</p>
                </div>
                <div className="text-5xl opacity-20">⚠️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Progresso Geral</p>
                  <p className="text-3xl font-bold mt-1">{estatisticasGerais.progressoGeral}%</p>
                  <p className="text-purple-100 text-xs mt-1">média de todas metas</p>
                </div>
                <div className="text-5xl opacity-20">📊</div>
              </div>
            </div>
          </div>

          {/* Alertas e Notificações */}
          {alertas.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🔔</span>
                Alertas e Notificações
              </h2>
              <div className="space-y-3">
                {alertas.map((alerta) => (
                  <div
                    key={alerta.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alerta.severidade === 'alta'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          alerta.severidade === 'alta' ? 'text-red-900' : 'text-yellow-900'
                        }`}>
                          {alerta.titulo}
                        </h3>
                        <p className={`text-sm mt-1 ${
                          alerta.severidade === 'alta' ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                          {alerta.descricao}
                        </p>
                        <p className={`text-xs mt-1 ${
                          alerta.severidade === 'alta' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {alerta.pacto}
                        </p>
                      </div>
                      <button
                        onClick={() => router.push('/pactuacao/pactos')}
                        className={`ml-4 px-3 py-1 rounded text-sm font-medium whitespace-nowrap ${
                          alerta.severidade === 'alta'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`}
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance por Setor */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance por Setor</h2>
            <div className="space-y-4">
              {performancePorSetor.map((setor) => (
                <div key={setor.setor} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{setor.setor}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      setor.progressoMedio >= 80 ? 'bg-green-100 text-green-800' :
                      setor.progressoMedio >= 50 ? 'bg-blue-100 text-blue-800' :
                      setor.progressoMedio >= 30 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {setor.progressoMedio}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Pactos Ativos</p>
                      <p className="text-lg font-semibold text-gray-900">{setor.pactosAtivos}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Metas Concluídas</p>
                      <p className="text-lg font-semibold text-gray-900">{setor.metasConcluidas}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total de Metas</p>
                      <p className="text-lg font-semibold text-gray-900">{setor.metasTotais}</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        setor.progressoMedio >= 80 ? 'bg-green-600' :
                        setor.progressoMedio >= 50 ? 'bg-blue-600' :
                        setor.progressoMedio >= 30 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${setor.progressoMedio}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Últimas Atualizações */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Últimas Atualizações</h2>
            <div className="space-y-3">
              {ultimasAtualizacoes.map((atualizacao) => {
                const variacao = atualizacao.valorNovo - atualizacao.valorAnterior;
                const percentualVariacao = ((variacao / atualizacao.valorAnterior) * 100).toFixed(1);

                return (
                  <div key={atualizacao.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{atualizacao.meta}</h3>
                        <p className="text-sm text-gray-600">{atualizacao.pacto}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-500">
                            {atualizacao.valorAnterior} {atualizacao.unidade}
                          </span>
                          <span className="text-green-600 font-semibold">→</span>
                          <span className="text-sm font-semibold text-green-600">
                            {atualizacao.valorNovo} {atualizacao.unidade}
                          </span>
                          <span className="text-xs text-green-600">
                            (+{percentualVariacao}%)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(atualizacao.data).toLocaleDateString('pt-BR')} | {atualizacao.responsavel}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/pactuacao/pactos')}
              className="bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 rounded-lg p-6 text-center font-semibold transition-colors"
            >
              📋 Ver Todos os Pactos
            </button>
            <button
              onClick={() => router.push('/pactuacao/metas')}
              className="bg-white hover:bg-gray-50 border-2 border-green-600 text-green-600 rounded-lg p-6 text-center font-semibold transition-colors"
            >
              🎯 Ver Todas as Metas
            </button>
            <button
              onClick={() => router.push('/pactuacao/pactos/novo')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 text-center font-semibold transition-colors"
            >
              ➕ Criar Novo Pacto
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SetorPerformance {
  setor: string;
  chamadosAtivos: number;
  atividadesConcluidas: number;
  atividadesTotais: number;
  progressoMedio: number;
}

export default function DashboardChamadosPage() {
  const router = useRouter();
  const [periodoSelecionado, setPeriodoSelecionado] = useState<'mes' | 'trimestre' | 'ano'>('mes');

  const estatisticasGerais = {
    totalChamados: 5,
    chamadosAbertos: 0,
    chamadosEmAndamento: 3,
    chamadosAguardando: 1,
    chamadosResolvidos: 1,
    totalAtividades: 10,
    atividadesConcluidas: 2,
    atividadesEmAndamento: 3,
    atividadesAtrasadas: 1,
    atividadesPendentes: 4,
    progressoGeral: 56
  };

  const performancePorSetor: SetorPerformance[] = [
    {
      setor: 'Qualidade',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      atividadesTotais: 3,
      progressoMedio: 42
    },
    {
      setor: 'Operações',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      atividadesTotais: 2,
      progressoMedio: 28
    },
    {
      setor: 'RH',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      atividadesTotais: 3,
      progressoMedio: 51
    },
    {
      setor: 'Facilities',
      chamadosAtivos: 0,
      atividadesConcluidas: 2,
      atividadesTotais: 2,
      progressoMedio: 100
    }
  ];

  const ultimasAtualizacoes = [
    {
      id: 1,
      chamado: 'Implantação do Sistema de Gestão da Qualidade',
      atividade: 'Mapear documentos',
      valorAnterior: 40,
      valorNovo: 45,
      unidade: '%',
      data: '2024-01-18',
      responsavel: 'Maria Santos'
    },
    {
      id: 2,
      chamado: 'Programa de Treinamento e Desenvolvimento',
      atividade: 'Treinar colaboradores',
      valorAnterior: 130,
      valorNovo: 145,
      unidade: 'pessoas',
      data: '2024-01-17',
      responsavel: 'Roberta Costa'
    },
    {
      id: 3,
      chamado: 'Redução de Custos Operacionais',
      atividade: 'Otimizar processos',
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
      titulo: 'Atividade próxima do prazo',
      descricao: 'Mapear documentos - Prazo em 7 dias',
      chamado: 'Implantação do Sistema de Gestão da Qualidade',
      severidade: 'alta'
    },
    {
      id: 2,
      tipo: 'atrasado',
      titulo: 'Atividade atrasada',
      descricao: 'Reduzir custos - Progresso abaixo do esperado',
      chamado: 'Redução de Custos Operacionais',
      severidade: 'alta'
    },
    {
      id: 3,
      tipo: 'atencao',
      titulo: 'Atenção necessária',
      descricao: 'Cumprir horas de treinamento - Progresso lento',
      chamado: 'Programa de Treinamento e Desenvolvimento',
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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex gap-2">
              {(['mes', 'trimestre', 'ano'] as const).map((periodo) => (
                <button
                  key={periodo}
                  onClick={() => setPeriodoSelecionado(periodo)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    periodoSelecionado === periodo
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 space-y-6">
          {/* Cards Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Chamados Ativos</p>
                  <p className="text-3xl font-bold mt-1">{estatisticasGerais.chamadosEmAndamento + estatisticasGerais.chamadosAguardando}</p>
                  <p className="text-blue-100 text-xs mt-1">de {estatisticasGerais.totalChamados} totais</p>
                </div>
                <div className="text-5xl opacity-20">🎫</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Atividades Concluídas</p>
                  <p className="text-3xl font-bold mt-1">{estatisticasGerais.atividadesConcluidas}</p>
                  <p className="text-green-100 text-xs mt-1">de {estatisticasGerais.totalAtividades} totais</p>
                </div>
                <div className="text-5xl opacity-20">✓</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Atividades Atrasadas</p>
                  <p className="text-3xl font-bold mt-1">{estatisticasGerais.atividadesAtrasadas}</p>
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
                  <p className="text-purple-100 text-xs mt-1">média de todas atividades</p>
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
                          {alerta.chamado}
                        </p>
                      </div>
                      <button
                        onClick={() => router.push('/chamados')}
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
                      <p className="text-xs text-gray-500">Chamados Ativos</p>
                      <p className="text-lg font-semibold text-gray-900">{setor.chamadosAtivos}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Atividades Concluídas</p>
                      <p className="text-lg font-semibold text-gray-900">{setor.atividadesConcluidas}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total de Atividades</p>
                      <p className="text-lg font-semibold text-gray-900">{setor.atividadesTotais}</p>
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
                        <h3 className="font-semibold text-gray-900">{atualizacao.atividade}</h3>
                        <p className="text-sm text-gray-600">{atualizacao.chamado}</p>
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
              onClick={() => router.push('/chamados')}
              className="bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 rounded-lg p-6 text-center font-semibold transition-colors"
            >
              🎫 Ver Todos os Chamados
            </button>
            <button
              onClick={() => router.push('/chamados/atividades')}
              className="bg-white hover:bg-gray-50 border-2 border-green-600 text-green-600 rounded-lg p-6 text-center font-semibold transition-colors"
            >
              📋 Ver Todas as Atividades
            </button>
            <button
              onClick={() => router.push('/chamados/novo')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 text-center font-semibold transition-colors"
            >
              ➕ Abrir Novo Chamado
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

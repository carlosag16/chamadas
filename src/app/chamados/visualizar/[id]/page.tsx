'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Atividade {
  id: number;
  descricao: string;
  valorAtual: number;
  valorMeta: number;
  unidade: string;
  prazo: string;
}

interface Chamado {
  id: number;
  titulo: string;
  setorSolicitante: string;
  equipeResponsavel: string;
  dataAbertura: string;
  dataPrevisao: string;
  status: 'Aberto' | 'Em Andamento' | 'Aguardando' | 'Resolvido' | 'Cancelado';
  descricao: string;
  impacto: string;
  categoria: string;
  atividades: Atividade[];
  solicitante: string;
  atendente: string;
  prioridade: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
}

export default function VisualizarChamadoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [atualizandoAtividade, setAtualizandoAtividade] = useState<number | null>(null);
  const [novoValor, setNovoValor] = useState<string>('');

  useEffect(() => {
    const mockChamados: Chamado[] = [
      {
        id: 1,
        titulo: 'Implantação do Sistema de Gestão da Qualidade',
        setorSolicitante: 'Diretoria',
        equipeResponsavel: 'Qualidade',
        dataAbertura: '2024-01-15',
        dataPrevisao: '2024-06-30',
        status: 'Em Andamento',
        descricao: 'Implementação completa do sistema de gestão da qualidade ISO 9001',
        impacto: 'Obter certificação ISO 9001 e melhorar processos internos de qualidade',
        categoria: 'Qualidade',
        prioridade: 'Alta',
        solicitante: 'João Silva',
        atendente: 'Maria Santos',
        atividades: [
          { id: 1, descricao: 'Mapear documentos', valorAtual: 45, valorMeta: 100, unidade: '%', prazo: '2024-03-30' },
          { id: 2, descricao: 'Realizar treinamentos', valorAtual: 8, valorMeta: 20, unidade: 'qtd', prazo: '2024-05-30' },
          { id: 3, descricao: 'Resolver não conformidades', valorAtual: 15, valorMeta: 30, unidade: 'qtd', prazo: '2024-06-15' }
        ]
      },
      {
        id: 2,
        titulo: 'Redução de Custos Operacionais',
        setorSolicitante: 'Financeiro',
        equipeResponsavel: 'Operações',
        dataAbertura: '2024-02-01',
        dataPrevisao: '2024-12-31',
        status: 'Em Andamento',
        descricao: 'Reduzir custos operacionais em 15% através de otimização de processos',
        impacto: 'Economia de R$ 500.000 no ano fiscal de 2024',
        categoria: 'Financeiro',
        prioridade: 'Alta',
        solicitante: 'Carlos Oliveira',
        atendente: 'Ana Paula Lima',
        atividades: [
          { id: 1, descricao: 'Reduzir custos', valorAtual: 5, valorMeta: 15, unidade: '%', prazo: '2024-12-31' },
          { id: 2, descricao: 'Otimizar processos', valorAtual: 12, valorMeta: 40, unidade: 'qtd', prazo: '2024-10-30' }
        ]
      },
    ];

    const chamadoEncontrado = mockChamados.find(c => c.id === parseInt(id));
    setChamado(chamadoEncontrado || null);
  }, [id]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Aberto': 'bg-gray-100 text-gray-800',
      'Em Andamento': 'bg-green-100 text-green-800',
      'Aguardando': 'bg-yellow-100 text-yellow-800',
      'Resolvido': 'bg-blue-100 text-blue-800',
      'Cancelado': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPrioridadeColor = (prioridade: string) => {
    const colors: Record<string, string> = {
      'Baixa': 'bg-gray-100 text-gray-700',
      'Média': 'bg-blue-100 text-blue-700',
      'Alta': 'bg-orange-100 text-orange-700',
      'Crítica': 'bg-red-100 text-red-700'
    };
    return colors[prioridade] || 'bg-gray-100 text-gray-700';
  };

  const calcularProgresso = (valorAtual: number, valorMeta: number) => {
    return Math.min(100, Math.round((valorAtual / valorMeta) * 100));
  };

  const iniciarAtualizacaoAtividade = (atividadeId: number, valorAtual: number) => {
    setAtualizandoAtividade(atividadeId);
    setNovoValor(valorAtual.toString());
  };

  const salvarAtualizacaoAtividade = (atividadeId: number) => {
    if (!chamado) return;

    const novoValorNum = parseFloat(novoValor);
    if (isNaN(novoValorNum)) {
      alert('Valor inválido');
      return;
    }

    const atividadesAtualizadas = chamado.atividades.map(at =>
      at.id === atividadeId ? { ...at, valorAtual: novoValorNum } : at
    );

    setChamado({ ...chamado, atividades: atividadesAtualizadas });
    setAtualizandoAtividade(null);
    setNovoValor('');
    alert('Atividade atualizada com sucesso!');
  };

  const cancelarAtualizacao = () => {
    setAtualizandoAtividade(null);
    setNovoValor('');
  };

  const calcularDiasRestantes = (dataPrevisao: string) => {
    const hoje = new Date();
    const fim = new Date(dataPrevisao);
    const diff = fim.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (!chamado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Chamado não encontrado</h2>
          <button
            onClick={() => router.push('/chamados')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Voltar para listagem
          </button>
        </div>
      </div>
    );
  }

  const diasRestantes = calcularDiasRestantes(chamado.dataPrevisao);
  const progressoGeral = Math.round(
    chamado.atividades.reduce((acc, at) => acc + calcularProgresso(at.valorAtual, at.valorMeta), 0) / chamado.atividades.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/chamados')}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Detalhes do Chamado</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPrioridadeColor(chamado.prioridade)}`}>
                {chamado.prioridade}
              </span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(chamado.status)}`}>
                {chamado.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 space-y-6">
          {/* Resumo Executivo */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-1">#{chamado.id} - {chamado.titulo}</h2>
            <p className="text-blue-100 text-sm mb-4">Categoria: {chamado.categoria}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Progresso Geral</p>
                <p className="text-3xl font-bold">{progressoGeral}%</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Atividades</p>
                <p className="text-3xl font-bold">{chamado.atividades.length}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Dias Restantes</p>
                <p className="text-3xl font-bold">{diasRestantes > 0 ? diasRestantes : 'Encerrado'}</p>
              </div>
            </div>
          </div>

          {/* Informações do Chamado */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Chamado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Setor Solicitante</p>
                <p className="text-base text-gray-900">{chamado.setorSolicitante}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Equipe Responsável</p>
                <p className="text-base text-gray-900">{chamado.equipeResponsavel}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Solicitante</p>
                <p className="text-base text-gray-900">{chamado.solicitante}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Atendente</p>
                <p className="text-base text-gray-900">{chamado.atendente}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Abertura</p>
                <p className="text-base text-gray-900">{new Date(chamado.dataAbertura).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Previsão de Conclusão</p>
                <p className="text-base text-gray-900">{new Date(chamado.dataPrevisao).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>

          {/* Descrição e Impacto */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrição e Impacto</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Descrição do Problema</p>
                <p className="text-base text-gray-900">{chamado.descricao}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Impacto</p>
                <p className="text-base text-gray-900">{chamado.impacto}</p>
              </div>
            </div>
          </div>

          {/* Atividades */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Atividades</h3>
              <p className="text-sm text-gray-500">Clique no valor atual para atualizar</p>
            </div>
            <div className="space-y-4">
              {chamado.atividades.map((atividade) => {
                const progresso = calcularProgresso(atividade.valorAtual, atividade.valorMeta);
                const prazoProximo = new Date(atividade.prazo).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

                return (
                  <div key={atividade.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{atividade.descricao}</h4>
                        <p className="text-sm text-gray-500">
                          Prazo: {new Date(atividade.prazo).toLocaleDateString('pt-BR')}
                          {prazoProximo && <span className="ml-2 text-orange-600 font-medium">⚠️ Prazo próximo!</span>}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        progresso >= 100 ? 'bg-green-100 text-green-800' :
                        progresso >= 70 ? 'bg-blue-100 text-blue-800' :
                        progresso >= 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {progresso}%
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            progresso >= 100 ? 'bg-green-600' :
                            progresso >= 70 ? 'bg-blue-600' :
                            progresso >= 40 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${progresso}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {atualizandoAtividade === atividade.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={novoValor}
                            onChange={(e) => setNovoValor(e.target.value)}
                            step="0.01"
                            className="w-24 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">/ {atividade.valorMeta} {atividade.unidade}</span>
                          <button
                            onClick={() => salvarAtualizacaoAtividade(atividade.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            ✓ Salvar
                          </button>
                          <button
                            onClick={cancelarAtualizacao}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                          >
                            ✗ Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => iniciarAtualizacaoAtividade(atividade.id, atividade.valorAtual)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Atual: {atividade.valorAtual} / Meta: {atividade.valorMeta} {atividade.unidade}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => router.push('/chamados')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

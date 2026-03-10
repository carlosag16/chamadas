'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Meta {
  id: number;
  indicador: string;
  valorAtual: number;
  valorMeta: number;
  unidade: string;
  prazo: string;
}

interface Pacto {
  id: number;
  titulo: string;
  setorSolicitante: string;
  setorResponsavel: string;
  dataInicio: string;
  dataFim: string;
  status: 'Rascunho' | 'Ativo' | 'Em Revisão' | 'Concluído' | 'Cancelado';
  descricao: string;
  objetivos: string;
  recursos: string;
  metas: Meta[];
  responsavelSolicitante: string;
  responsavelResponsavel: string;
}

export default function VisualizarPactoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [pacto, setPacto] = useState<Pacto | null>(null);
  const [atualizandoMeta, setAtualizandoMeta] = useState<number | null>(null);
  const [novoValor, setNovoValor] = useState<string>('');

  useEffect(() => {
    // Mock data - em produção, isso viria de uma API
    const mockPactos: Pacto[] = [
      {
        id: 1,
        titulo: 'Pacto de Implementação de Sistema de Qualidade',
        setorSolicitante: 'Diretoria',
        setorResponsavel: 'Qualidade',
        dataInicio: '2024-01-15',
        dataFim: '2024-06-30',
        status: 'Ativo',
        descricao: 'Implementação completa do sistema de gestão da qualidade ISO 9001',
        objetivos: 'Obter certificação ISO 9001 e melhorar processos internos de qualidade',
        recursos: 'Equipe de 5 pessoas, orçamento de R$ 150.000, consultoria externa',
        responsavelSolicitante: 'João Silva',
        responsavelResponsavel: 'Maria Santos',
        metas: [
          { id: 1, indicador: 'Documentos mapeados', valorAtual: 45, valorMeta: 100, unidade: '%', prazo: '2024-03-30' },
          { id: 2, indicador: 'Treinamentos realizados', valorAtual: 8, valorMeta: 20, unidade: 'qtd', prazo: '2024-05-30' },
          { id: 3, indicador: 'Não conformidades resolvidas', valorAtual: 15, valorMeta: 30, unidade: 'qtd', prazo: '2024-06-15' }
        ]
      },
      {
        id: 2,
        titulo: 'Pacto de Redução de Custos Operacionais',
        setorSolicitante: 'Financeiro',
        setorResponsavel: 'Operações',
        dataInicio: '2024-02-01',
        dataFim: '2024-12-31',
        status: 'Ativo',
        descricao: 'Reduzir custos operacionais em 15% através de otimização de processos',
        objetivos: 'Economia de R$ 500.000 no ano fiscal de 2024',
        recursos: 'Equipe multidisciplinar de 8 pessoas, ferramentas de análise',
        responsavelSolicitante: 'Carlos Oliveira',
        responsavelResponsavel: 'Ana Paula Lima',
        metas: [
          { id: 1, indicador: 'Redução de custos', valorAtual: 5, valorMeta: 15, unidade: '%', prazo: '2024-12-31' },
          { id: 2, indicador: 'Processos otimizados', valorAtual: 12, valorMeta: 40, unidade: 'qtd', prazo: '2024-10-30' }
        ]
      },
    ];

    const pactoEncontrado = mockPactos.find(p => p.id === parseInt(id));
    setPacto(pactoEncontrado || null);
  }, [id]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Rascunho': 'bg-gray-100 text-gray-800',
      'Ativo': 'bg-green-100 text-green-800',
      'Em Revisão': 'bg-yellow-100 text-yellow-800',
      'Concluído': 'bg-blue-100 text-blue-800',
      'Cancelado': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const calcularProgresso = (valorAtual: number, valorMeta: number) => {
    return Math.min(100, Math.round((valorAtual / valorMeta) * 100));
  };

  const iniciarAtualizacaoMeta = (metaId: number, valorAtual: number) => {
    setAtualizandoMeta(metaId);
    setNovoValor(valorAtual.toString());
  };

  const salvarAtualizacaoMeta = (metaId: number) => {
    if (!pacto) return;

    const novoValorNum = parseFloat(novoValor);
    if (isNaN(novoValorNum)) {
      alert('Valor inválido');
      return;
    }

    const metasAtualizadas = pacto.metas.map(meta =>
      meta.id === metaId ? { ...meta, valorAtual: novoValorNum } : meta
    );

    setPacto({ ...pacto, metas: metasAtualizadas });
    setAtualizandoMeta(null);
    setNovoValor('');
    alert('Meta atualizada com sucesso!');
  };

  const cancelarAtualizacao = () => {
    setAtualizandoMeta(null);
    setNovoValor('');
  };

  const calcularDiasRestantes = (dataFim: string) => {
    const hoje = new Date();
    const fim = new Date(dataFim);
    const diff = fim.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (!pacto) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pacto não encontrado</h2>
          <button
            onClick={() => router.push('/pactuacao/pactos')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Voltar para listagem
          </button>
        </div>
      </div>
    );
  }

  const diasRestantes = calcularDiasRestantes(pacto.dataFim);
  const progressoGeral = Math.round(
    pacto.metas.reduce((acc, meta) => acc + calcularProgresso(meta.valorAtual, meta.valorMeta), 0) / pacto.metas.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/pactuacao/pactos')}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Detalhes do Pacto</h1>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(pacto.status)}`}>
              {pacto.status}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 space-y-6">
          {/* Resumo Executivo */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{pacto.titulo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Progresso Geral</p>
                <p className="text-3xl font-bold">{progressoGeral}%</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Metas Cadastradas</p>
                <p className="text-3xl font-bold">{pacto.metas.length}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Dias Restantes</p>
                <p className="text-3xl font-bold">{diasRestantes > 0 ? diasRestantes : 'Encerrado'}</p>
              </div>
            </div>
          </div>

          {/* Informações do Pacto */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Pacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Setor Solicitante</p>
                <p className="text-base text-gray-900">{pacto.setorSolicitante}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Setor Responsável</p>
                <p className="text-base text-gray-900">{pacto.setorResponsavel}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Responsável Solicitante</p>
                <p className="text-base text-gray-900">{pacto.responsavelSolicitante}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Responsável Executor</p>
                <p className="text-base text-gray-900">{pacto.responsavelResponsavel}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Início</p>
                <p className="text-base text-gray-900">{new Date(pacto.dataInicio).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Término</p>
                <p className="text-base text-gray-900">{new Date(pacto.dataFim).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>

          {/* Descrição e Objetivos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrição e Objetivos</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Descrição</p>
                <p className="text-base text-gray-900">{pacto.descricao}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Objetivos</p>
                <p className="text-base text-gray-900">{pacto.objetivos}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Recursos Necessários</p>
                <p className="text-base text-gray-900">{pacto.recursos}</p>
              </div>
            </div>
          </div>

          {/* Metas e Indicadores */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Metas e Indicadores</h3>
              <p className="text-sm text-gray-500">Clique no valor atual para atualizar</p>
            </div>
            <div className="space-y-4">
              {pacto.metas.map((meta) => {
                const progresso = calcularProgresso(meta.valorAtual, meta.valorMeta);
                const prazoProximo = new Date(meta.prazo).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

                return (
                  <div key={meta.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{meta.indicador}</h4>
                        <p className="text-sm text-gray-500">
                          Prazo: {new Date(meta.prazo).toLocaleDateString('pt-BR')}
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
                      {atualizandoMeta === meta.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={novoValor}
                            onChange={(e) => setNovoValor(e.target.value)}
                            step="0.01"
                            className="w-24 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">/ {meta.valorMeta} {meta.unidade}</span>
                          <button
                            onClick={() => salvarAtualizacaoMeta(meta.id)}
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
                          onClick={() => iniciarAtualizacaoMeta(meta.id, meta.valorAtual)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Atual: {meta.valorAtual} / Meta: {meta.valorMeta} {meta.unidade}
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
              onClick={() => router.push('/pactuacao/pactos')}
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

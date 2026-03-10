'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import QRCode from 'qrcode';

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

export default function PactosPage() {
  const router = useRouter();
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalQR, setModalQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [pactoSelecionado, setPactoSelecionado] = useState<Pacto | null>(null);
  const [modoModal, setModoModal] = useState<'visualizar' | 'editar' | 'novo'>('visualizar');

  // Mock data
  const [pactos, setPactos] = useState<Pacto[]>([
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
    {
      id: 3,
      titulo: 'Pacto de Digitalização de Documentos',
      setorSolicitante: 'TI',
      setorResponsavel: 'Administrativo',
      dataInicio: '2024-03-01',
      dataFim: '2024-09-30',
      status: 'Em Revisão',
      descricao: 'Digitalizar todo o acervo físico de documentos dos últimos 10 anos',
      objetivos: 'Reduzir espaço físico e facilitar acesso à informação',
      recursos: 'Scanner industrial, 3 operadores, sistema de gestão documental',
      responsavelSolicitante: 'Pedro Henrique',
      responsavelResponsavel: 'Lucia Fernandes',
      metas: [
        { id: 1, indicador: 'Documentos digitalizados', valorAtual: 25000, valorMeta: 100000, unidade: 'docs', prazo: '2024-09-30' },
        { id: 2, indicador: 'Espaço físico liberado', valorAtual: 30, valorMeta: 80, unidade: 'm²', prazo: '2024-09-30' }
      ]
    },
    {
      id: 4,
      titulo: 'Pacto de Treinamento e Desenvolvimento',
      setorSolicitante: 'RH',
      setorResponsavel: 'Todas as áreas',
      dataInicio: '2024-01-10',
      dataFim: '2024-12-20',
      status: 'Ativo',
      descricao: 'Programa anual de capacitação e desenvolvimento de colaboradores',
      objetivos: 'Capacitar 100% dos colaboradores em suas áreas específicas',
      recursos: 'Orçamento de R$ 200.000, plataforma EAD, instrutores internos e externos',
      responsavelSolicitante: 'Roberta Costa',
      responsavelResponsavel: 'Diversos gestores',
      metas: [
        { id: 1, indicador: 'Colaboradores treinados', valorAtual: 145, valorMeta: 350, unidade: 'pessoas', prazo: '2024-12-20' },
        { id: 2, indicador: 'Horas de treinamento', valorAtual: 580, valorMeta: 2000, unidade: 'horas', prazo: '2024-12-20' },
        { id: 3, indicador: 'Satisfação com treinamentos', valorAtual: 8.5, valorMeta: 9.0, unidade: 'nota', prazo: '2024-12-20' }
      ]
    },
    {
      id: 5,
      titulo: 'Pacto de Sustentabilidade Ambiental',
      setorSolicitante: 'Meio Ambiente',
      setorResponsavel: 'Facilities',
      dataInicio: '2023-11-01',
      dataFim: '2024-04-30',
      status: 'Concluído',
      descricao: 'Implementar práticas sustentáveis e reduzir impacto ambiental',
      objetivos: 'Reduzir consumo de energia em 20% e aumentar reciclagem em 50%',
      recursos: 'Equipe de 4 pessoas, investimento em equipamentos eficientes',
      responsavelSolicitante: 'Marcos Pereira',
      responsavelResponsavel: 'Sandra Alves',
      metas: [
        { id: 1, indicador: 'Redução consumo energia', valorAtual: 22, valorMeta: 20, unidade: '%', prazo: '2024-04-30' },
        { id: 2, indicador: 'Aumento reciclagem', valorAtual: 55, valorMeta: 50, unidade: '%', prazo: '2024-04-30' },
        { id: 3, indicador: 'Colaboradores engajados', valorAtual: 280, valorMeta: 250, unidade: 'pessoas', prazo: '2024-04-30' }
      ]
    }
  ]);

  const pactosFiltrados = filtroStatus === 'Todos'
    ? pactos
    : pactos.filter(p => p.status === filtroStatus);

  const abrirModal = (pacto: Pacto | null, modo: 'visualizar' | 'editar' | 'novo') => {
    setPactoSelecionado(pacto);
    setModoModal(modo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPactoSelecionado(null);
  };

  const gerarQRCode = async (pactoId: number) => {
    const url = `${window.location.origin}/pactuacao/pactos/visualizar/${pactoId}`;
    try {
      const qrDataUrl = await QRCode.toDataURL(url, { width: 300 });
      setQrCodeUrl(qrDataUrl);
      setModalQR(true);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const copiarLink = (pactoId: number) => {
    const url = `${window.location.origin}/pactuacao/pactos/visualizar/${pactoId}`;
    navigator.clipboard.writeText(url);
    alert('Link copiado para a área de transferência!');
  };

  const excluirPacto = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este pacto?')) {
      setPactos(pactos.filter(p => p.id !== id));
      alert('Pacto excluído com sucesso!');
    }
  };

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

  const calcularProgresso = (metas: Meta[]) => {
    if (metas.length === 0) return 0;
    const progresso = metas.reduce((acc, meta) => {
      return acc + (meta.valorAtual / meta.valorMeta) * 100;
    }, 0);
    return Math.min(100, Math.round(progresso / metas.length));
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
              <h1 className="text-2xl font-bold text-gray-900">Pactos e Acordos</h1>
            </div>
            <button
              onClick={() => router.push('/pactuacao/pactos/novo')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              + Novo Pacto
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Filtros */}
          <div className="mb-6 flex flex-wrap gap-2">
            {['Todos', 'Rascunho', 'Ativo', 'Em Revisão', 'Concluído', 'Cancelado'].map((status) => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filtroStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Setores
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progresso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pactosFiltrados.map((pacto) => {
                  const progresso = calcularProgresso(pacto.metas);
                  return (
                    <tr key={pacto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{pacto.titulo}</div>
                        <div className="text-sm text-gray-500">ID: {pacto.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{pacto.setorSolicitante}</div>
                        <div className="text-sm text-gray-500">→ {pacto.setorResponsavel}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(pacto.dataInicio).toLocaleDateString('pt-BR')} até{' '}
                        {new Date(pacto.dataFim).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${progresso}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{progresso}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pacto.status)}`}>
                          {pacto.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/pactuacao/pactos/visualizar/${pacto.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Visualizar"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => abrirModal(pacto, 'editar')}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => gerarQRCode(pacto.id)}
                            className="text-green-600 hover:text-green-900"
                            title="QR Code"
                          >
                            📱
                          </button>
                          <button
                            onClick={() => copiarLink(pacto.id)}
                            className="text-purple-600 hover:text-purple-900"
                            title="Copiar Link"
                          >
                            🔗
                          </button>
                          <button
                            onClick={() => excluirPacto(pacto.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Excluir"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {pactosFiltrados.map((pacto) => {
              const progresso = calcularProgresso(pacto.metas);
              return (
                <div key={pacto.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{pacto.titulo}</h3>
                      <p className="text-sm text-gray-500">ID: {pacto.id}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pacto.status)}`}>
                      {pacto.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Setores: </span>
                      <span className="text-gray-900">{pacto.setorSolicitante} → {pacto.setorResponsavel}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Período: </span>
                      <span className="text-gray-900">
                        {new Date(pacto.dataInicio).toLocaleDateString('pt-BR')} até{' '}
                        {new Date(pacto.dataFim).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Progresso: </span>
                      <div className="flex items-center mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progresso}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{progresso}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => router.push(`/pactuacao/pactos/visualizar/${pacto.id}`)}
                      className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100"
                    >
                      Ver Detalhes
                    </button>
                    <button
                      onClick={() => gerarQRCode(pacto.id)}
                      className="bg-green-50 text-green-700 px-3 py-2 rounded text-sm font-medium hover:bg-green-100"
                    >
                      QR
                    </button>
                    <button
                      onClick={() => excluirPacto(pacto.id)}
                      className="bg-red-50 text-red-700 px-3 py-2 rounded text-sm font-medium hover:bg-red-100"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {pactosFiltrados.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">Nenhum pacto encontrado com o status selecionado.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal QR Code */}
      {modalQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">QR Code do Pacto</h3>
              <button
                onClick={() => setModalQR(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center">
              <img src={qrCodeUrl} alt="QR Code" className="max-w-full" />
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Escaneie este QR Code para visualizar o pacto
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

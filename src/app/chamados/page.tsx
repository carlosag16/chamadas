'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import QRCode from 'qrcode';

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

export default function ChamadosPage() {
  const router = useRouter();
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [modalQR, setModalQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const [chamados, setChamados] = useState<Chamado[]>([
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
    {
      id: 3,
      titulo: 'Digitalização de Documentos',
      setorSolicitante: 'TI',
      equipeResponsavel: 'Administrativo',
      dataAbertura: '2024-03-01',
      dataPrevisao: '2024-09-30',
      status: 'Aguardando',
      descricao: 'Digitalizar todo o acervo físico de documentos dos últimos 10 anos',
      impacto: 'Reduzir espaço físico e facilitar acesso à informação',
      categoria: 'Infraestrutura',
      prioridade: 'Média',
      solicitante: 'Pedro Henrique',
      atendente: 'Lucia Fernandes',
      atividades: [
        { id: 1, descricao: 'Digitalizar documentos', valorAtual: 25000, valorMeta: 100000, unidade: 'docs', prazo: '2024-09-30' },
        { id: 2, descricao: 'Liberar espaço físico', valorAtual: 30, valorMeta: 80, unidade: 'm²', prazo: '2024-09-30' }
      ]
    },
    {
      id: 4,
      titulo: 'Programa de Treinamento e Desenvolvimento',
      setorSolicitante: 'RH',
      equipeResponsavel: 'Todas as áreas',
      dataAbertura: '2024-01-10',
      dataPrevisao: '2024-12-20',
      status: 'Em Andamento',
      descricao: 'Programa anual de capacitação e desenvolvimento de colaboradores',
      impacto: 'Capacitar 100% dos colaboradores em suas áreas específicas',
      categoria: 'Treinamento',
      prioridade: 'Média',
      solicitante: 'Roberta Costa',
      atendente: 'Diversos gestores',
      atividades: [
        { id: 1, descricao: 'Treinar colaboradores', valorAtual: 145, valorMeta: 350, unidade: 'pessoas', prazo: '2024-12-20' },
        { id: 2, descricao: 'Cumprir horas de treinamento', valorAtual: 580, valorMeta: 2000, unidade: 'horas', prazo: '2024-12-20' },
        { id: 3, descricao: 'Atingir satisfação mínima', valorAtual: 8.5, valorMeta: 9.0, unidade: 'nota', prazo: '2024-12-20' }
      ]
    },
    {
      id: 5,
      titulo: 'Sustentabilidade Ambiental',
      setorSolicitante: 'Meio Ambiente',
      equipeResponsavel: 'Facilities',
      dataAbertura: '2023-11-01',
      dataPrevisao: '2024-04-30',
      status: 'Resolvido',
      descricao: 'Implementar práticas sustentáveis e reduzir impacto ambiental',
      impacto: 'Reduzir consumo de energia em 20% e aumentar reciclagem em 50%',
      categoria: 'Sustentabilidade',
      prioridade: 'Baixa',
      solicitante: 'Marcos Pereira',
      atendente: 'Sandra Alves',
      atividades: [
        { id: 1, descricao: 'Reduzir consumo de energia', valorAtual: 22, valorMeta: 20, unidade: '%', prazo: '2024-04-30' },
        { id: 2, descricao: 'Aumentar reciclagem', valorAtual: 55, valorMeta: 50, unidade: '%', prazo: '2024-04-30' },
        { id: 3, descricao: 'Engajar colaboradores', valorAtual: 280, valorMeta: 250, unidade: 'pessoas', prazo: '2024-04-30' }
      ]
    }
  ]);

  const chamadosFiltrados = filtroStatus === 'Todos'
    ? chamados
    : chamados.filter(c => c.status === filtroStatus);

  const gerarQRCode = async (chamadoId: number) => {
    const url = `${window.location.origin}/chamados/visualizar/${chamadoId}`;
    try {
      const qrDataUrl = await QRCode.toDataURL(url, { width: 300 });
      setQrCodeUrl(qrDataUrl);
      setModalQR(true);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const copiarLink = (chamadoId: number) => {
    const url = `${window.location.origin}/chamados/visualizar/${chamadoId}`;
    navigator.clipboard.writeText(url);
    alert('Link copiado para a área de transferência!');
  };

  const excluirChamado = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este chamado?')) {
      setChamados(chamados.filter(c => c.id !== id));
      alert('Chamado excluído com sucesso!');
    }
  };

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

  const calcularProgresso = (atividades: Atividade[]) => {
    if (atividades.length === 0) return 0;
    const progresso = atividades.reduce((acc, at) => {
      return acc + (at.valorAtual / at.valorMeta) * 100;
    }, 0);
    return Math.min(100, Math.round(progresso / atividades.length));
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
              <h1 className="text-2xl font-bold text-gray-900">Chamados de Serviço</h1>
            </div>
            <button
              onClick={() => router.push('/chamados/novo')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              + Novo Chamado
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Filtros */}
          <div className="mb-6 flex flex-wrap gap-2">
            {['Todos', 'Aberto', 'Em Andamento', 'Aguardando', 'Resolvido', 'Cancelado'].map((status) => (
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
                    Chamado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solicitante / Equipe
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
                {chamadosFiltrados.map((chamado) => {
                  const progresso = calcularProgresso(chamado.atividades);
                  return (
                    <tr key={chamado.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{chamado.titulo}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">#{chamado.id}</span>
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getPrioridadeColor(chamado.prioridade)}`}>
                            {chamado.prioridade}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{chamado.setorSolicitante}</div>
                        <div className="text-sm text-gray-500">→ {chamado.equipeResponsavel}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(chamado.dataAbertura).toLocaleDateString('pt-BR')} até{' '}
                        {new Date(chamado.dataPrevisao).toLocaleDateString('pt-BR')}
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
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(chamado.status)}`}>
                          {chamado.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/chamados/visualizar/${chamado.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Visualizar"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => gerarQRCode(chamado.id)}
                            className="text-green-600 hover:text-green-900"
                            title="QR Code"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => copiarLink(chamado.id)}
                            className="text-purple-600 hover:text-purple-900"
                            title="Copiar Link"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </button>
                          <button
                            onClick={() => excluirChamado(chamado.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Excluir"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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
            {chamadosFiltrados.map((chamado) => {
              const progresso = calcularProgresso(chamado.atividades);
              return (
                <div key={chamado.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{chamado.titulo}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">#{chamado.id}</p>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getPrioridadeColor(chamado.prioridade)}`}>
                          {chamado.prioridade}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(chamado.status)}`}>
                      {chamado.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Setores: </span>
                      <span className="text-gray-900">{chamado.setorSolicitante} → {chamado.equipeResponsavel}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Previsão: </span>
                      <span className="text-gray-900">
                        {new Date(chamado.dataPrevisao).toLocaleDateString('pt-BR')}
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
                      onClick={() => router.push(`/chamados/visualizar/${chamado.id}`)}
                      className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100"
                    >
                      Ver Detalhes
                    </button>
                    <button
                      onClick={() => gerarQRCode(chamado.id)}
                      className="bg-green-50 text-green-700 px-3 py-2 rounded text-sm font-medium hover:bg-green-100"
                    >
                      QR
                    </button>
                    <button
                      onClick={() => excluirChamado(chamado.id)}
                      className="bg-red-50 text-red-700 px-3 py-2 rounded text-sm font-medium hover:bg-red-100"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {chamadosFiltrados.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">Nenhum chamado encontrado com o status selecionado.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal QR Code */}
      {modalQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">QR Code do Chamado</h3>
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
              Escaneie este QR Code para visualizar o chamado
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

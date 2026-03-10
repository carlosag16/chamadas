'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Setor {
  id: number;
  nome: string;
  sigla: string;
  responsavel: string;
  email: string;
  telefone: string;
  descricao: string;
  chamadosAtivos: number;
  atividadesConcluidas: number;
  status: 'Ativo' | 'Inativo';
}

export default function SetoresPage() {
  const router = useRouter();
  const [modalAberto, setModalAberto] = useState(false);
  const [setorSelecionado, setSetorSelecionado] = useState<Setor | null>(null);
  const [modoModal, setModoModal] = useState<'visualizar' | 'editar' | 'novo'>('visualizar');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');

  const [setores, setSetores] = useState<Setor[]>([
    {
      id: 1,
      nome: 'Diretoria',
      sigla: 'DIR',
      responsavel: 'João Silva',
      email: 'joao.silva@empresa.com',
      telefone: '(11) 98765-4321',
      descricao: 'Diretoria executiva responsável pelas decisões estratégicas',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Financeiro',
      sigla: 'FIN',
      responsavel: 'Carlos Oliveira',
      email: 'carlos.oliveira@empresa.com',
      telefone: '(11) 98765-4322',
      descricao: 'Gestão financeira, orçamentária e contábil',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Recursos Humanos',
      sigla: 'RH',
      responsavel: 'Roberta Costa',
      email: 'roberta.costa@empresa.com',
      telefone: '(11) 98765-4323',
      descricao: 'Gestão de pessoas, recrutamento e desenvolvimento',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 4,
      nome: 'Tecnologia da Informação',
      sigla: 'TI',
      responsavel: 'Pedro Henrique',
      email: 'pedro.henrique@empresa.com',
      telefone: '(11) 98765-4324',
      descricao: 'Infraestrutura de TI, sistemas e suporte técnico',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 5,
      nome: 'Operações',
      sigla: 'OPE',
      responsavel: 'Ana Paula Lima',
      email: 'ana.lima@empresa.com',
      telefone: '(11) 98765-4325',
      descricao: 'Gestão de processos operacionais e produção',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 6,
      nome: 'Qualidade',
      sigla: 'QLD',
      responsavel: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      telefone: '(11) 98765-4326',
      descricao: 'Gestão da qualidade, processos e certificações',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 7,
      nome: 'Comercial',
      sigla: 'COM',
      responsavel: 'Ricardo Almeida',
      email: 'ricardo.almeida@empresa.com',
      telefone: '(11) 98765-4327',
      descricao: 'Vendas, negociação e relacionamento com clientes',
      chamadosAtivos: 0,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 8,
      nome: 'Marketing',
      sigla: 'MKT',
      responsavel: 'Juliana Martins',
      email: 'juliana.martins@empresa.com',
      telefone: '(11) 98765-4328',
      descricao: 'Marketing, comunicação e branding',
      chamadosAtivos: 0,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 9,
      nome: 'Administrativo',
      sigla: 'ADM',
      responsavel: 'Lucia Fernandes',
      email: 'lucia.fernandes@empresa.com',
      telefone: '(11) 98765-4329',
      descricao: 'Serviços administrativos e suporte geral',
      chamadosAtivos: 1,
      atividadesConcluidas: 0,
      status: 'Ativo'
    },
    {
      id: 10,
      nome: 'Facilities',
      sigla: 'FAC',
      responsavel: 'Sandra Alves',
      email: 'sandra.alves@empresa.com',
      telefone: '(11) 98765-4330',
      descricao: 'Gestão de instalações e infraestrutura predial',
      chamadosAtivos: 0,
      atividadesConcluidas: 2,
      status: 'Ativo'
    }
  ]);

  const [formData, setFormData] = useState<Partial<Setor>>({
    nome: '',
    sigla: '',
    responsavel: '',
    email: '',
    telefone: '',
    descricao: '',
    status: 'Ativo'
  });

  const setoresFiltrados = filtroStatus === 'Todos'
    ? setores
    : setores.filter(s => s.status === filtroStatus);

  const abrirModal = (setor: Setor | null, modo: 'visualizar' | 'editar' | 'novo') => {
    if (setor) {
      setSetorSelecionado(setor);
      setFormData(setor);
    } else {
      setSetorSelecionado(null);
      setFormData({
        nome: '',
        sigla: '',
        responsavel: '',
        email: '',
        telefone: '',
        descricao: '',
        status: 'Ativo'
      });
    }
    setModoModal(modo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setSetorSelecionado(null);
    setFormData({
      nome: '',
      sigla: '',
      responsavel: '',
      email: '',
      telefone: '',
      descricao: '',
      status: 'Ativo'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const salvarSetor = () => {
    if (modoModal === 'novo') {
      const novoSetor: Setor = {
        id: setores.length + 1,
        nome: formData.nome!,
        sigla: formData.sigla!,
        responsavel: formData.responsavel!,
        email: formData.email!,
        telefone: formData.telefone!,
        descricao: formData.descricao!,
        chamadosAtivos: 0,
        atividadesConcluidas: 0,
        status: formData.status as 'Ativo' | 'Inativo'
      };
      setSetores([...setores, novoSetor]);
      alert('Setor criado com sucesso!');
    } else if (modoModal === 'editar' && setorSelecionado) {
      const setoresAtualizados = setores.map(s =>
        s.id === setorSelecionado.id ? { ...s, ...formData } : s
      );
      setSetores(setoresAtualizados);
      alert('Setor atualizado com sucesso!');
    }
    fecharModal();
  };

  const excluirSetor = (id: number) => {
    const setor = setores.find(s => s.id === id);
    if (setor && setor.chamadosAtivos > 0) {
      alert('Não é possível excluir um setor com chamados ativos!');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este setor?')) {
      setSetores(setores.filter(s => s.id !== id));
      alert('Setor excluído com sucesso!');
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Gestão de Setores</h1>
            </div>
            <button
              onClick={() => abrirModal(null, 'novo')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              + Novo Setor
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Filtros */}
          <div className="mb-6 flex gap-2">
            {['Todos', 'Ativo', 'Inativo'].map((status) => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filtroStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {status === 'Ativo' ? 'Ativos' : status === 'Inativo' ? 'Inativos' : status}
              </button>
            ))}
          </div>

          {/* Grid de Setores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {setoresFiltrados.map((setor) => (
              <div key={setor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-gray-900">{setor.nome}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {setor.sigla}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{setor.descricao}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    setor.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {setor.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Responsável:</span>
                    <span className="text-gray-900 font-medium">{setor.responsavel}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Email:</span>
                    <span className="text-gray-900">{setor.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Telefone:</span>
                    <span className="text-gray-900">{setor.telefone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Chamados Ativos</p>
                    <p className="text-xl font-bold text-blue-600">{setor.chamadosAtivos}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Atividades Concluídas</p>
                    <p className="text-xl font-bold text-green-600">{setor.atividadesConcluidas}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => abrirModal(setor, 'visualizar')}
                    className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => abrirModal(setor, 'editar')}
                    className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded text-sm font-medium hover:bg-yellow-100"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => excluirSetor(setor.id)}
                    className="bg-red-50 text-red-700 px-3 py-2 rounded text-sm font-medium hover:bg-red-100"
                    disabled={setor.chamadosAtivos > 0}
                    title={setor.chamadosAtivos > 0 ? 'Não é possível excluir setor com chamados ativos' : 'Excluir'}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {setoresFiltrados.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">Nenhum setor encontrado com o status selecionado.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {modoModal === 'novo' ? 'Novo Setor' : modoModal === 'editar' ? 'Editar Setor' : 'Detalhes do Setor'}
                </h2>
                <button
                  onClick={fecharModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {modoModal === 'visualizar' ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome do Setor</p>
                    <p className="text-base text-gray-900">{setorSelecionado?.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sigla</p>
                    <p className="text-base text-gray-900">{setorSelecionado?.sigla}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Responsável</p>
                    <p className="text-base text-gray-900">{setorSelecionado?.responsavel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-base text-gray-900">{setorSelecionado?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefone</p>
                    <p className="text-base text-gray-900">{setorSelecionado?.telefone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Descrição</p>
                    <p className="text-base text-gray-900">{setorSelecionado?.descricao}</p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => setModoModal('editar')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={fecharModal}
                      className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); salvarSetor(); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome do Setor *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sigla *
                      </label>
                      <input
                        type="text"
                        name="sigla"
                        value={formData.sigla}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Responsável *
                      </label>
                      <input
                        type="text"
                        name="responsavel"
                        value={formData.responsavel}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição *
                      </label>
                      <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                    >
                      {modoModal === 'novo' ? 'Criar Setor' : 'Salvar Alterações'}
                    </button>
                    <button
                      type="button"
                      onClick={fecharModal}
                      className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

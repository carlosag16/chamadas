'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Meta {
  id: number;
  indicador: string;
  valorMeta: number;
  unidade: string;
  prazo: string;
}

export default function NovoPactoPage() {
  const router = useRouter();
  const [metas, setMetas] = useState<Meta[]>([]);
  const [proximoIdMeta, setProximoIdMeta] = useState(1);

  const [formData, setFormData] = useState({
    titulo: '',
    setorSolicitante: '',
    setorResponsavel: '',
    dataInicio: '',
    dataFim: '',
    descricao: '',
    objetivos: '',
    recursos: '',
    responsavelSolicitante: '',
    responsavelResponsavel: '',
  });

  const [novaMeta, setNovaMeta] = useState({
    indicador: '',
    valorMeta: '',
    unidade: '',
    prazo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovaMeta(prev => ({ ...prev, [name]: value }));
  };

  const adicionarMeta = () => {
    if (!novaMeta.indicador || !novaMeta.valorMeta || !novaMeta.unidade || !novaMeta.prazo) {
      alert('Por favor, preencha todos os campos da meta');
      return;
    }

    const meta: Meta = {
      id: proximoIdMeta,
      indicador: novaMeta.indicador,
      valorMeta: parseFloat(novaMeta.valorMeta),
      unidade: novaMeta.unidade,
      prazo: novaMeta.prazo
    };

    setMetas([...metas, meta]);
    setProximoIdMeta(proximoIdMeta + 1);
    setNovaMeta({ indicador: '', valorMeta: '', unidade: '', prazo: '' });
  };

  const removerMeta = (id: number) => {
    setMetas(metas.filter(m => m.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (metas.length === 0) {
      alert('Adicione pelo menos uma meta ao pacto');
      return;
    }

    console.log('Pacto criado:', { ...formData, metas });
    alert('Pacto criado com sucesso!');
    router.push('/pactuacao/pactos');
  };

  const setores = [
    'Diretoria',
    'Financeiro',
    'RH',
    'TI',
    'Operações',
    'Qualidade',
    'Comercial',
    'Marketing',
    'Administrativo',
    'Produção',
    'Logística',
    'Compras',
    'Facilities',
    'Meio Ambiente'
  ];

  const unidades = ['%', 'qtd', 'R$', 'horas', 'dias', 'pessoas', 'docs', 'm²', 'nota', 'pontos'];

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
              <h1 className="text-2xl font-bold text-gray-900">Novo Pacto</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título do Pacto *
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Pacto de Implementação de Sistema de Qualidade"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Setor Solicitante *
                </label>
                <select
                  name="setorSolicitante"
                  value={formData.setorSolicitante}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  {setores.map(setor => (
                    <option key={setor} value={setor}>{setor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Setor Responsável *
                </label>
                <select
                  name="setorResponsavel"
                  value={formData.setorResponsavel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  {setores.map(setor => (
                    <option key={setor} value={setor}>{setor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsável Solicitante *
                </label>
                <input
                  type="text"
                  name="responsavelSolicitante"
                  value={formData.responsavelSolicitante}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do responsável"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsável do Setor Responsável *
                </label>
                <input
                  type="text"
                  name="responsavelResponsavel"
                  value={formData.responsavelResponsavel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do responsável"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Início *
                </label>
                <input
                  type="date"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Término *
                </label>
                <input
                  type="date"
                  name="dataFim"
                  value={formData.dataFim}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Descrição e Objetivos */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Descrição e Objetivos</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição do Pacto *
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva detalhadamente o que será realizado neste pacto..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivos *
                </label>
                <textarea
                  name="objetivos"
                  value={formData.objetivos}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Quais são os objetivos principais deste pacto?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recursos Necessários *
                </label>
                <textarea
                  name="recursos"
                  value={formData.recursos}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Equipe, orçamento, ferramentas, etc..."
                />
              </div>
            </div>
          </div>

          {/* Metas e Indicadores */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Metas e Indicadores</h2>

            {/* Formulário para adicionar meta */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-blue-900 mb-3">Adicionar Nova Meta</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="indicador"
                    value={novaMeta.indicador}
                    onChange={handleMetaChange}
                    placeholder="Nome do indicador"
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="valorMeta"
                    value={novaMeta.valorMeta}
                    onChange={handleMetaChange}
                    placeholder="Valor meta"
                    step="0.01"
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <select
                    name="unidade"
                    value={novaMeta.unidade}
                    onChange={handleMetaChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Unidade</option>
                    {unidades.map(un => (
                      <option key={un} value={un}>{un}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="date"
                    name="prazo"
                    value={novaMeta.prazo}
                    onChange={handleMetaChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={adicionarMeta}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                + Adicionar Meta
              </button>
            </div>

            {/* Lista de metas adicionadas */}
            {metas.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Metas Adicionadas:</h3>
                {metas.map(meta => (
                  <div key={meta.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{meta.indicador}</span>
                      <span className="text-gray-600 ml-2">
                        | Meta: {meta.valorMeta} {meta.unidade}
                      </span>
                      <span className="text-gray-500 ml-2 text-sm">
                        | Prazo: {new Date(meta.prazo).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removerMeta(meta.id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">Nenhuma meta adicionada ainda. Adicione pelo menos uma meta.</p>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.push('/pactuacao/pactos')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              Criar Pacto
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

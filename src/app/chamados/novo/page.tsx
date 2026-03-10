'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const portaisPorMunicipio: Record<string, string[]> = {
	'Brasil Novo': ['GIAT', 'Protocolo', 'VISA'],
	'Senador José Porfírio': ['GIAT', 'Protocolo', 'VISA'],
	Castanhal: ['GIAT', 'Protocolo', 'VISA'],
};

export default function NovoChamadoPage() {
	const router = useRouter();
	const [arquivos, setArquivos] = useState<File[]>([]);

	const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		setArquivos((prev) => [...prev, ...files]);
		e.target.value = '';
	};

	const removerArquivo = (index: number) => {
		setArquivos((prev) => prev.filter((_, i) => i !== index));
	};

	const [formData, setFormData] = useState({
		municipio: '',
		portal: '',
		titulo: '',
		setorSolicitante: '',
		equipeResponsavel: '',
		descricao: '',
		categoria: '',
		prioridade: '',
		solicitante: '',
	});

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		if (name === 'municipio') {
			setFormData((prev) => ({ ...prev, municipio: value, portal: '' }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Chamado criado:', { ...formData, arquivos });
		alert('Chamado criado com sucesso!');
		router.push('/chamados');
	};

	const municipios = ['Brasil Novo', 'Senador José Porfírio', 'Castanhal'];

	const setores = ['Cadastro', 'Desenvolvimento', 'Infraestrutura'];

	const categorias = [
		'Manutenção',
		'Suporte Técnico',
		'Instalação',
		'Qualidade',
		'Financeiro',
		'Infraestrutura',
		'Treinamento',
		'Sustentabilidade',
		'Segurança',
		'Outros',
	];

	const portaisDisponiveis = formData.municipio
		? (portaisPorMunicipio[formData.municipio] ?? [])
		: [];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<button
								onClick={() => router.push('/chamados')}
								className="mr-4 text-gray-500 hover:text-gray-700">
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 19l-7-7m0 0l7-7m-7 7h18"
									/>
								</svg>
							</button>
							<h1 className="text-2xl font-bold text-gray-900">Novo Chamado</h1>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Município e Portal */}
					<div className="bg-white shadow-md rounded-lg p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							Município e Portal
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Município *
								</label>
								<select
									name="municipio"
									value={formData.municipio}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">Selecione o município...</option>
									{municipios.map((m) => (
										<option key={m} value={m}>
											{m}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Portal / Contrato *
								</label>
								<select
									name="portal"
									value={formData.portal}
									onChange={handleInputChange}
									required
									disabled={!formData.municipio}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400">
									<option value="">
										{formData.municipio
											? 'Selecione o portal...'
											: 'Selecione o município primeiro'}
									</option>
									{portaisDisponiveis.map((p) => (
										<option key={p} value={p}>
											{p}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					{/* Informações Básicas */}
					<div className="bg-white shadow-md rounded-lg p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							Informações Básicas
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Título do Chamado *
								</label>
								<input
									type="text"
									name="titulo"
									value={formData.titulo}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Ex: Sistema lento"
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
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">Selecione...</option>
									{setores.map((setor) => (
										<option key={setor} value={setor}>
											{setor}
										</option>
									))}
								</select>
							</div>

							{/* <div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Equipe Responsável *
								</label>
								<select
									name="equipeResponsavel"
									value={formData.equipeResponsavel}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">Selecione...</option>
									{setores.map((setor) => (
										<option key={setor} value={setor}>
											{setor}
										</option>
									))}
								</select>
							</div> */}

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Solicitante *
								</label>
								<input
									type="text"
									name="solicitante"
									value={formData.solicitante}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Nome do solicitante"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Categoria *
								</label>
								<select
									name="categoria"
									value={formData.categoria}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">Selecione...</option>
									{categorias.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Prioridade *
								</label>
								<select
									name="prioridade"
									value={formData.prioridade}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">Selecione...</option>
									<option value="Baixa">Baixa</option>
									<option value="Média">Média</option>
									<option value="Alta">Alta</option>
									<option value="Crítica">Crítica</option>
								</select>
							</div>
						</div>
					</div>

					{/* Descrição e Impacto */}
					<div className="bg-white shadow-md rounded-lg p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							Descrição
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Descrição do Problema *
								</label>
								<textarea
									name="descricao"
									value={formData.descricao}
									onChange={handleInputChange}
									required
									rows={3}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Descreva detalhadamente o problema ou solicitação..."
								/>
							</div>

							{/* <div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Impacto *
								</label>
								<textarea
									name="impacto"
									value={formData.impacto}
									onChange={handleInputChange}
									required
									rows={3}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Qual é o impacto deste problema? O que será resolvido?"
								/>
							</div> */}
						</div>
					</div>

					{/* Anexos */}
				<div className="bg-white shadow-md rounded-lg p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Anexos</h2>
					<div className="space-y-4">
						<label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
							<div className="flex flex-col items-center justify-center">
								<svg className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<span className="text-sm text-gray-500">Clique para adicionar imagem ou vídeo</span>
								<span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, MP4, MOV</span>
							</div>
							<input
								type="file"
								accept="image/*,video/*"
								multiple
								onChange={handleArquivoChange}
								className="hidden"
							/>
						</label>

						{arquivos.length > 0 && (
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
								{arquivos.map((arquivo, index) => (
									<div key={index} className="relative group">
										{arquivo.type.startsWith('image/') ? (
											<img
												src={URL.createObjectURL(arquivo)}
												alt={arquivo.name}
												className="w-full h-24 object-cover rounded-lg border border-gray-200"
											/>
										) : (
											<div className="w-full h-24 bg-gray-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
												<svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
												</svg>
												<span className="text-xs text-gray-500 mt-1 px-2 truncate w-full text-center">{arquivo.name}</span>
											</div>
										)}
										<button
											type="button"
											onClick={() => removerArquivo(index)}
											className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
										>
											×
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Botões de Ação */}
					<div className="flex gap-4 justify-end">
						<button
							type="button"
							onClick={() => router.push('/chamados')}
							className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors">
							Cancelar
						</button>
						<button
							type="submit"
							className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
							Abrir Chamado
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}

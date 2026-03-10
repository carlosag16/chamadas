'use client';

import { useRouter } from 'next/navigation';

const municipios = [
	{ id: 'brasil-novo', nome: 'Brasil Novo' },
	{ id: 'senador-jose-porfirio', nome: 'Senador José Porfírio' },
	{ id: 'castanhal', nome: 'Castanhal' },
	{ id: 'breves', nome: 'Breves' },
];

export default function Home() {
	const router = useRouter();

	const selecionarMunicipio = (municipioId: string, municipioNome: string) => {
		sessionStorage.setItem('municipio_id', municipioId);
		sessionStorage.setItem('municipio_nome', municipioNome);
		router.push('/login');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 px-4">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Chamados Isaneto
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Selecione o município para continuar
					</p>
				</div>

				<div className="space-y-3">
					{municipios.map((municipio) => (
						<button
							key={municipio.id}
							onClick={() => selecionarMunicipio(municipio.id, municipio.nome)}
							className="w-full flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-400 transition-all text-left group">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:bg-indigo-600"></div>
								<span className="text-base font-medium text-gray-900">
									{municipio.nome}
								</span>
							</div>
							<svg
								className="h-5 w-5 text-gray-400 group-hover:text-indigo-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

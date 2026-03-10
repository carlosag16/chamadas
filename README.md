# Sistema de Pactuação Interna

Sistema web para gestão de pactos e acordos entre setores de uma organização, permitindo o acompanhamento de metas, indicadores e performance.

## Sobre o Sistema

O **Sistema de Pactuação Interna** é uma aplicação desenvolvida para facilitar a criação, gestão e acompanhamento de acordos formais entre diferentes setores/departamentos de uma empresa. O sistema permite:

- ✅ Criar e gerenciar pactos entre setores
- 📊 Definir e acompanhar metas e indicadores (KPIs)
- 📈 Visualizar dashboards de performance
- 🏢 Gerenciar setores e departamentos
- 🎯 Monitorar progresso em tempo real
- ⚠️ Receber alertas sobre prazos e metas

## Funcionalidades Principais

### 1. Gestão de Pactos
- Criação de novos pactos entre setores
- Definição de setores solicitante e responsável
- Estabelecimento de objetivos e recursos necessários
- Acompanhamento de status (Rascunho, Ativo, Em Revisão, Concluído, Cancelado)
- Geração de QR Codes para compartilhamento
- Visualização detalhada de cada pacto

### 2. Metas e Indicadores
- Cadastro de múltiplas metas por pacto
- Definição de valores meta e prazos
- Atualização de valores atuais
- Cálculo automático de progresso
- Filtros por status, setor e ordenação
- Alertas de metas próximas ao prazo

### 3. Dashboard de Indicadores
- Visão geral de todos os pactos e metas
- Estatísticas gerais (pactos ativos, metas concluídas, etc.)
- Performance por setor
- Alertas e notificações
- Últimas atualizações
- Filtros por período (mês, trimestre, ano)

### 4. Gestão de Setores
- Cadastro de setores/departamentos
- Informações de responsáveis e contatos
- Acompanhamento de pactos ativos por setor
- Controle de status (Ativo/Inativo)

## Tecnologias Utilizadas

- **Next.js 15.5.3** - Framework React com App Router
- **React 19.1.0** - Biblioteca JavaScript para interfaces
- **TypeScript 5.x** - Tipagem estática
- **Tailwind CSS 4.x** - Framework CSS utilitário
- **QRCode** - Geração de QR codes

## Começando

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### Executar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Login

Use as credenciais padrão:
- **Usuário**: admin
- **Senha**: admin

## Estrutura do Projeto

```
src/app/
├── page.tsx                          # Página de login
├── layout.tsx                        # Layout raiz
├── globals.css                       # Estilos globais
├── dashboard/
│   └── page.tsx                      # Dashboard principal
└── pactuacao/
    ├── pactos/
    │   ├── page.tsx                  # Listagem de pactos
    │   ├── novo/
    │   │   └── page.tsx              # Criar novo pacto
    │   └── visualizar/[id]/
    │       └── page.tsx              # Visualizar/editar pacto
    ├── metas/
    │   └── page.tsx                  # Acompanhamento de metas
    ├── setores/
    │   └── page.tsx                  # Gestão de setores
    └── dashboard/
        └── page.tsx                  # Dashboard de indicadores
```

## Dados Mock

Atualmente o sistema utiliza dados mock (dados de exemplo) armazenados localmente em cada componente. Para integração com um backend real, você precisará:

1. Configurar a variável de ambiente `NEXT_PUBLIC_API_URL` no arquivo `.env.local`
2. Implementar as chamadas API nos componentes
3. Substituir os dados mock por requisições HTTP

## Build para Produção

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Próximos Passos

- [ ] Integração com backend/API
- [ ] Autenticação robusta com JWT
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios (PDF, Excel)
- [ ] Histórico de alterações
- [ ] Upload de documentos anexos
- [ ] Sistema de assinaturas digitais
- [ ] Gráficos avançados
- [ ] Aplicativo móvel

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto é de uso interno da organização.

## Suporte

Para dúvidas ou suporte, entre em contato com a equipe de TI.

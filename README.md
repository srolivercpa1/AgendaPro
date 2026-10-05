# AgendaPro

AgendaPro é uma plataforma SaaS para gestão de agendamentos, clientes, profissionais, serviços, financeiro e WhatsApp para pequenas e médias empresas.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL

## Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou pnpm

## Instalação

1. Clone o repositório.
2. Copie o arquivo `.env.example` para `.env`.
3. Ajuste as variáveis do banco e a chave de autenticação.
4. Instale as dependências:

```bash
npm install
```

5. Gere o cliente Prisma:

```bash
npx prisma generate
```

6. Execute as migrações:

```bash
npx prisma migrate dev --name init
```

7. Rode o seed de demonstração:

```bash
npm run prisma:seed
```

8. Inicie o ambiente local:

```bash
npm run dev
```

Acesse: http://localhost:3000

## Login demo

Depois do seed, você terá um usuário administrador de demonstração:

- E-mail: admin@agendapro.com
- Senha: admin123

## Estrutura principal

- `src/app` - páginas e rotas da aplicação
- `src/components` - componentes reutilizáveis
- `src/lib` - utilitários, autenticação e conexão com banco
- `prisma/schema.prisma` - modelagem do banco
- `prisma/seed.ts` - dados de demonstração

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run type-check
npx prisma studio
```

## Segurança

- Senhas com hash via bcrypt
- Sessões em cookie HTTP-only
- Isolamento por empresa
- Validação server-side de rotas
- Proteção de respostas sensíveis

## Implantação

Este projeto está preparado para deploy em plataformas compatíveis com Node.js e PostgreSQL, como Vercel, Railway, Render e VPS Linux.

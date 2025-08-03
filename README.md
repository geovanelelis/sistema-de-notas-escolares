# Sistema de Notas Escolares

Este projeto é um sistema de notas escolares desenvolvido para auxiliar professores, como o Carlos, a gerenciar as notas e a frequência de seus alunos. O sistema permite a criação de disciplinas, a inserção de notas em disciplinas para cada aluno e o registro de frequência, calculando automaticamente médias individuais e da turma, além de identificar alunos que necessitam de atenção especial.

## 🚀 Funcionalidades

- Inserção de notas (0 a 10) para disciplinas por aluno.
- Registro de frequência (0 a 100%) por aluno.
- Cálculo automático da média de notas de cada aluno.
- Cálculo automático da média da turma em cada disciplina.
- Identificação de alunos com média de notas acima da média da turma.
- Identificação de alunos com frequência abaixo de 75%.

## 🛠️ Tecnologias

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Prisma ORM (com PostgreSQL)

## 🌐 Deploy

A interface está hospedada na Vercel (frontend) e no Render (backend) com integração GitHub:

[https://sistema-de-notas-escolares.vercel.app/](https://sistema-de-notas-escolares.vercel.app/)

[https://sistema-de-notas-escolares.onrender.com/](https://sistema-de-notas-escolares.onrender.com/)

## 📁 Clonando o Repositório

No seu terminal:

```bash
git clone https://github.com/geovanelelis/sistema-de-notas-escolares.git
cd sistema-de-notas-escolares
```

## ⚙️ Executando Localmente

### ✅ Pré-requisitos

- Node.js (versão recomendada >=14)
- npm ou Yarn
- PostgreSQL instalado localmente ou em servidor acessível

### 🔧 Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com a variável de conexão ao banco:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/seu_banco"
```

Gere o cliente Prisma e aplique a migration inicial:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

(Opcional) Utilize o Prisma Studio para visualizar dados:

```bash
npx prisma studio
```

Inicie o servidor Express:

```bash
node server.js
```

O backend estará disponível em `http://localhost:3000`

### 🔧 Frontend

Acesse a pasta do frontend:

```bash
cd ../frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação será aberta em `http://localhost:5173` (ou outra porta informada)

## 💡 Fluxo de Uso Local

- Adicione disciplinas usando o formulário no frontend.
- Cadastre alunos com notas e frequência.
- Clique em “Ver Relatório” para visualizar:
  - Médias individuais
  - Médias por disciplina
  - Alunos acima da média geral
  - Alunos com frequência abaixo de 75%

## 🧩 Premissas e Decisões de Projeto

- Separação entre frontend e backend para clareza e modularidade.
- O backend é responsável pela persistência dos dados.
- O frontend consome APIs REST via `fetch()` para interagir com o backend.
- O cálculo de médias e filtros pode ser feito no frontend ou backend, mas optei pelo frontend por familiaridade.
- Uso do Prisma facilita a modelagem relacional (Aluno, Disciplina e Nota).

## 📌 Pontos Importantes

- Cada aluno possui notas associadas às disciplinas existentes no banco.
- A frequência é tratada como valor percentual (0‑100).
- Ao cadastrar disciplinas, o frontend atualiza a lista de opções para notas no formulário de cadastro de alunos.
- Os resultados são carregados via API.
- Foi realizado o deploy do projeto utilizando o Vercel para o frontend e o Render para o backend.

## 💡 Possíveis Melhorias Futuras

- Validação de formulários (JavaScript ou bibliotecas de formulário).
- Autenticação para ampliar a usabilidade do projeto.
- Implementar testes unitários.

## 👤 Autor

Geovane da Silva Lelis

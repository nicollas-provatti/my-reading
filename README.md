# 📚 Minhas Leituras

Aplicação web para gerenciamento de leituras pessoais, permitindo cadastrar livros, acompanhar status de leitura, avaliações e visualizar detalhes de cada obra.

O projeto foi desenvolvido com foco em **boas práticas de React**, organização de estado global e experiência do usuário.

---

## 🚀 Funcionalidades

### 📚 Gerenciamento de leituras
- 📖 Cadastro de livros
- ✏️ Edição de informações
- 🗑️ Remoção de livros
- 🔎 Visualização detalhada de cada livro
- 📊 Organização por status de leitura
- ⭐ Avaliação por estrelas

### 🔐 Autenticação e usuários
- 👤 Criação de conta (register)
- 🔑 Login com autenticação JWT
- 🚪 Logout
- 🔒 Proteção de rotas privadas
- 🗂️ Isolamento de dados por usuário

### 🧩 Experiência do usuário
- ⏳ Feedback visual de carregamento e ações assíncronas
- ⚠️ Tratamento de erros

---

## 📷 Captura

![public/screenshot.png](public/screenshot.png)

---

## 🛠️ Tecnologias utilizadas

- **React**
- **Context API**
- **Custom Hooks**
- **Tailwind CSS**
- **DaisyUI**
- **React Icons**
- **JavaScript (ES6+)**

---

## 🧠 Conceitos aplicados

### 🎨 Frontend
- Gerenciamento de estado global com **Context API + Reducer**
- Criação de **custom hooks** para encapsular lógica reutilizável
- Separação entre:
  - `isFetching` (operações de leitura)
  - `isMutating` (operações de escrita)
- Atualização controlada da UI durante mutações assíncronas
- Componentização e reutilização de UI
- Organização de pastas orientada a domínio
- Feedback visual de loading e erro
- Modais reutilizáveis
- Proteção de rotas com **React Router**

### 🔐 Autenticação
- Autenticação baseada em **JWT**
- Persistência do token no **localStorage**
- Controle de sessão (login, logout, registro)
- Proteção de rotas privadas no frontend
- Associação de dados por `userId`

### 🖧 Backend
- Criação de API REST com **Node.js + Express**
- Middleware de autenticação para validação de JWT
- Separação de responsabilidades (controllers, services, routes)
- Validação de permissões por usuário
- Uso de variáveis de ambiente para dados sensíveis

### 🗄️ Banco de dados
- Modelagem de dados relacional
- Uso de **Prisma ORM**
- Migrations para versionamento do schema
- Relacionamentos entre entidades (User, Book, Genre)
- Migração de banco (**SQLite → PostgreSQL**)

### 🚀 Deploy e produção
- Deploy do frontend na **Vercel**
- Deploy do backend no **Render**
- Configuração de variáveis de ambiente em produção
- Uso de banco PostgreSQL externo (**Neon**)
- Adequação da aplicação às limitações de ambiente de produção


---

## 💻 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/minhas-leituras.git

# Para o frontend:
# 1. Entre na pasta do projeto
cd my-readings
# 2. Instale as dependências
npm install

# 3. Rode a aplicação
npm run dev

# Para o backend (em outro terminal):
# 1. Entre na pasta do backend
cd my-readings/backend

# 2. Instale as dependências
npm install

# 3. Rode a aplicação
npm run dev
```

---

## 🧭 Evolução do projeto e decisões técnicas

Este projeto foi desenvolvido de forma **incremental**, com o objetivo de explorar diferentes abordagens de persistência de dados e autenticação, evoluindo gradualmente até uma arquitetura fullstack mais próxima de um ambiente real de produção.  
Desde o início, o código foi estruturado de forma **escalável e organizada**, o que permitiu a adição de novas funcionalidades e mudanças arquiteturais **sem necessidade de over engineering ou grandes refatorações**, mantendo a base do projeto consistente ao longo de sua evolução.


### 1️⃣ Persistência local com `localStorage`

A primeira versão do projeto utilizava o `localStorage` para armazenar os livros no navegador.

**Objetivo da abordagem:**

- Focar na construção da interface
- Validar regras de negócio
- Exercitar gerenciamento de estado no frontend

**Limitações identificadas:**

- Dados restritos ao navegador do usuário
- Nenhum compartilhamento entre sessões ou dispositivos
- Ausência de autenticação

### 2️⃣ Persistência em arquivos no backend

Na segunda etapa, os dados passaram a ser persistidos em **arquivos no backend**, simulando uma API real.

**Ganhos com essa abordagem:**

- Separação clara entre frontend e backend
- Introdução de operações CRUD via API
- Melhor entendimento do fluxo cliente → servidor

**Limitações identificadas:**

- Todos os usuários compartilhavam os mesmos dados
- Ausência de controle de acesso
- Escalabilidade limitada

## 3️⃣ Dados por usuário (`userId`) e autenticação

Para resolver o problema de dados compartilhados, o projeto evoluiu para suportar **múltiplos usuários**.

**Foram adicionados:**

- Associação de livros a um `userId`
- Sistema de autenticação com **JWT**
- Rotas protegidas no backend
- Login e registro de usuários no frontend

**Benefícios dessa etapa:**

- Isolamento de dados por usuário
- Controle de acesso às rotas
- Fluxo completo de autenticação (login / logout / register)

## 4️⃣ Banco de dados com Prisma + SQLite

Em seguida, foi introduzido um banco de dados utilizando **Prisma ORM + SQLite**, permitindo:

- Modelagem de dados relacional
- Relacionamentos entre usuários, livros e gêneros
- Abstração de queries SQL

**Problema encontrado em produção:**

- O deploy no Render (plano gratuito) não oferece disco persistente
- Os dados eram perdidos a cada restart da aplicação

## 5️⃣ Migração para PostgreSQL (Neon) com Prisma

Para resolver o problema de persistência em produção, o projeto foi migrado para **PostgreSQL**, utilizando o **Neon** como provider gratuito, mantendo o Prisma como ORM.

**Resultados dessa migração:**

- Persistência real de dados em produção
- Compatibilidade total com o Render
- Uso de migrations para versionamento do banco
- Arquitetura mais próxima de um cenário profissional

## 📌 Estado atual do projeto

- Frontend: **React + Vite**
- Backend: **Node.js + Express**
- Autenticação: **JWT**
- Banco de dados: **PostgreSQL (Neon)**
- ORM: **Prisma**
- Deploy:
  - Frontend: **Vercel**
  - Backend: **Render**

---

## 🌐 Deploy

🔗 [Acesse a aplicação online](https://my-reading-topaz.vercel.app/login)



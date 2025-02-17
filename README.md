# 📘 Aplicativo blog professores

Este repositório contém o código-fonte do aplicativo Blog Professores, um app desenvolvido para facilitar a interação entre professores e alunos.

## 🚀 Instalação

Para começar a usar o projeto, siga os passos abaixo:

#### 📋 Pré-requisitos: 

- Instalar node v20.18.1+;
- Instalar o docker; 

#### 1️⃣ 🖥️ Clone o repositório

[![GitHub](https://img.shields.io/badge/GitHub-Clone-blue?logo=github&logoColor=white)](https://github.com/FIAP-G4/app-blog-professores-mobile)

Clone o projeto para o seu ambiente de desenvolvimento usando o comando git clone:

```bash
  git clone https://github.com/FIAP-G4/app-blog-professores-mobile.git
```

#### 2️⃣ 📂 Entre no diretório do projeto:

[![Directory](https://img.shields.io/badge/Directory-Browse-blue?logo=folder&logoColor=white)](#)

```bash
  cd app-blog-professores-mobile
```

#### 3️⃣ 🗂️ Configure o arquivo ENV

[![Files](https://img.shields.io/badge/configure_files-lightgrey?logo=file&logoColor=white)](#)

Localize o arquivo `.env.example` na raiz do projeto e faça uma cópia dele sem a extensão `.example.` Por exemplo, renomeie `.env.example` para `.env`.

#### 🔴  ATENÇÃO 
  A variavel de ambiente do env `EXPO_PUBLIC_CORS_ORIGIN` deve ser definida com o ip local da sua maquina por exemplo `http://192.168.0.6:3000` as demais se quiser pode manter o valor que esta no `.env.example`

#### 4️⃣ 📦 Instale as Dependências

Execute o seguinte comando para instalar todas as dependências do projeto:

```bash
  npm install
```

#### 5️⃣ 🐳 Inicie o backend e o banco de dados com o Docker

[![Docker](https://img.shields.io/badge/docker-blue?logo=docker&logoColor=white)](https://www.docker.com/)

Certifique-se de ter o Docker instalado em sua máquina e execute o seguinte comando para iniciar o aplicativo:

```bash
  docker compose up -d
```
Pronto, foi iniciado 2 containers:

  - postgres-fiap (o banco de dados);
  - api-blog ( aplicação backend);


#### 6️⃣ 🚀 Rodando o aplicativo

Para rodar o APP, rode o seguinte comando no terminal

```bash
  npm run start
```

#### 7️⃣ 📱 acesse a aplicação

Você pode acessar o aplicativo de duas formas:
- 📷 Escaneando o QR Code e abrindo diretamente no celular
- 🖥️ Usando um emulador pelo terminal onde o app foi iniciado


#### 8️⃣ 🎥 Link para vídeo explicativo

[Assista ao vídeo aqui]()

![YouTube](https://img.shields.io/badge/YouTube-Watch-red?logo=youtube&logoColor=white)
# EventCalendar - a plataforma de eventos ideal

## Introdução

### Descrição do projeto

Pensando nas exigências do projeto individual, foi escolhida a 3º opção (Plataforma de eventos com gerenciamento de inscrições) para se realizar o desenvolvimento de uma aplicação web que utiliza um banco de dados integrado. 

No projeto, na área de programação, serão usados softwares como Supabase (para construção do banco de dados), PostgreSQL (framework para integrar as informações do banco de dados), bem como a utilização de Javascript e HTML5 para produção do site.

Em design, serão produzidos wireframes, assim como protótipos de alta e de baixa fidelidade, para visualizar o andamento do site e projetar sua construção previamente.

### O que é e como funciona o EventCalendar

O EventCalendar surgiu, então, de uma dor comum a plataformas de eventos: a falta de eficiência e facilidade na hora de inscrever-se para participar de um evento. Nele, torna-se possível agir para tornar a experiência dos usuários cada vez mais agradável, implementando funcionalidades como:

1. Visualizar eventos a um certo raio de distância do usuário e filtrar por proximidade, por tipo (congresso, show, festival, exposição, ...) ou demais filtros (artista, gênero musical, área de estudo, palestrante...)

2. Inscrever-se no evento desejado e, assim, unificar o cadastro em sites populares de eventos ou demais websites, visando a otimização do tempo na hora da compra de um ingresso

3. Receber lembretes constantes, por email e pelo site, de eventos desejados que estão chegando e de abertura das vendas de futuros eventos

Haverá a integração de um banco de dados relacional, que integrará diversas funcionalidades do site, utilizando a modelagem MVC, ou seja, Model, View e Controller. O uso do MVC, neste caso, auxilia a manter uma melhor organização do projeto e prevenir possíveis erros.

### Estrutura das pastas

```
ponderada-m2-01/
│
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal que inicializa o servidor
└── rest.http              # Teste de endpoints (opcional)
```

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
* **`views/`**: Views da aplicação.

### Como executar o projeto localmente

1. Instale uma IDE. Preferencialmente, O VS Code.
  
2. No terminal da sua IDE, digite os comandos abaixo:

```bash
git clone https://github.com/liviatavares/ponderada-m2-01.git

npm install
npm init -y
npm install express ejs
```

---

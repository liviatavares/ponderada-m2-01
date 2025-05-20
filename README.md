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
├── app.js
├── server.js    # Arquivo principal que inicializa o servidor
├── package.json    # Gerenciador de dependências do Node.js
├── package-lock.json    # Gerenciador de dependências do Node.js
├── .gitattributes
├── banco_dados.sql
├── jest.config.js    # Arquivo de configuração do Jest
├── rest.http    # Teste de endpoints
├── README.md    # Documentação do projeto (Markdown)
├── .env    #Arquivo de exemplo para variáveis de ambiente
├── assets/
├── config/
│   ├── database.js
├── controllers/
│   ├── userController.js
├── documents/
│   ├── PI-WAD.md
├── models/
│   ├── userModel.js
├── routes/
│   └── frontRoutes.js
│   └── userRoutes.js
├── scripts/
│   └── db.sql
│   └── runSQLScript.js
├── services/
│   └── userService.js
├── views/
│   ├── components/
│   │   ├── header.ejs
│   ├── css/
│   │   ├── style.css
│   ├── layout/
│   │   ├── style.css
│   ├── pages/
│   │   ├── page1.ejs
│   │   ├── page2.ejs
├── tests/
│   └── userController.test.js
│   └── userModel.test.js
│   └── userRoutes.test.js
│   └── userService.test.js
```

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
* **`views/`**: Views da aplicação.
* **`services/`**: Serviços auxiliares do sistema.
*  **`scripts/`**: Arquivos de JavaScript públicos.

### Como executar o projeto localmente

1. Instale uma IDE. Preferencialmente, O VS Code.
  
2. No terminal da sua IDE, digite os comandos abaixo:

```bash
git clone https://github.com/liviatavares/ponderada-m2-01.git

npm install
npm init -y
npm install express ejs
```

### Como configurar o banco de dados?

O banco de dados integrado a essa aplicação em específico está presente no Supabase, porém oculto pelo arquivo .gitignore por segurança. 

Para criar um novo banco de dados e conectá-lo ao projeto, basta seguir os seguintes passos:

#### 1. Inicializando o supabase 

Crie uma conta no [site do supabase](https://supabase.com) e crie um projeto individual. Quando for criar seu projeto, guarde a senha do teu projeto - ela será extremamente essencial para a conexão do banco.

#### 2. Criando o banco

Coloque no SQL Editor do seu projeto individual o código contido em `/scripts/init.sql` e dê ctrl + enter para inicializá-lo e criar as tabelas na sua máquina.

#### Conectando o banco ao projeto

Crie um arquivo .env no VS Code e coloque neles os seguintes parâmetros:

```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```
Coloque, nesses espaços, as informações contidas no seu Supabase após clicar em Connect > Connection String > Session Pooler > View parameters. No DB_PASSWORD, coloque a senha do seu banco.

#### Encerrando a conexão

Após conectar ao supabase, no terminal da sua IDE, digite:

```
npm run init-db
```
Para estabelecer a conexão.

### Como testar as APIs (GET, PUT, POST, DELETE)

Após fazer o passo a passo para conectar o banco de dados acima, 

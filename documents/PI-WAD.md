# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto

EventCalendar

### Autor do projeto

Lívia Sabóia Tavares 

T18, Módulo 2, Grupo 01

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

O **EventCalendar**, uma plataforma de eventos com gerenciamento de inscrições (opção 3), é um website simples e acessível, que tem como objetivo tornar mais fácil a acessibilidade a inscrições em eventos e compra de ingressos. Com ele, é possível:

1. Visualizar eventos a um certo raio de distância do usuário e filtrar por proximidade

2. Visualizar eventos por tipo (congresso, show, festival, exposição, ...) e demais filtros (artista, gênero musical, área de estudo, palestrante...)

3. Inscrever-se no evento desejado e, assim, unificar o cadastro em sites populares de eventos ou demais websites, visando a otimização do tempo na hora da compra de um ingresso

4. Receber lembretes constantes, por email e pelo site, de eventos desejados que estão chegando e de abertura das vendas de futuros eventos

5. Explorar características de eventos, como data, local, horário, artista e preço

6. Ser redirecionado diretamente para os sites/formulários/links externos daqueles que despertam interesse, unificando a experiência

Sua interface será objetiva e visualmente agradável, e terá como missão facilitar a vida do usuário e estimular a visibilidade de diversos eventos.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas

<div align="center">
<sub>Figura 00 - Persona 01 - Julia Rodrigues</sub>
<br>
<br>
<p align="center">
<a><img src="/assets/persona1.png" alt="Persona 1 - Julia Rodrigues" border="0"></a>
</p>
<sup>Fonte: Material produzido pela autora (2025)</sup>
<br>
<br>
</div>

### 2.2. User Stories

<div align="center">
<sub>Tabela 01 - US01</sub>
<br>
<br>

Identificação | US01
--- | ---
Persona | Julia Rodrigues
User Story | "Como alguém que não consegue lembrar muito bem de datas de shows, quero receber notificações quando as vendas de um show se aproximarem, para não perder nenhuma oportunidade de ir a esses eventos"
Critério de aceite 1 | CR1: as notificações devem chegar ao usuário por meio de emails. Um email deve ser mandado ao usuário quando faltar, respectivamente, 1 semana e 1 dia para o início das vendas.
Critério de aceite 2 | CR2: as notificações devem também aparecer no site. Quando entrar no site, no período de tempo de lembrete para o evento, uma notificação deve aparecer.
Critérios INVEST | A garantia das notificações não interfere em demais features do site (I); Pode ser ajustada com base no interesse do usuário em atender ou não tal evento (N); Soluciona uma das dores da persona (o não lembrete constante) (V); É fácil de ser estimada em duração e complexidade pelo time de desenvolvimento, e não atrapalha o desenvolvimento de demais integrações (E); Pode ser completa em um período de tempo razoável, por não ser uma contribuição muito complicada ao projeto (S); Pode ser facilmente testada após realizarem-se os critérios de testes para o aceite (por exemplo, demonstrar interesse em um evento no site deve ser o bastante para garantir o funcionamento dessa usabilidade) (T).

</div>

<div align="center">
<sub>Tabela 02 - US02</sub>
<br>
<br>

Identificação | US02
--- | ---
Persona | Julia Rodrigues
User Story | "como usuária, quero que o cadastro nos sites de eventos seja unificado, para que isso não se torne um empecilho para comprar um ingresso de um show"
Critério de aceite 1 | CR1: O usuário, ao se cadastrar no EventCalendar, poderá compartilhar seus dados e criar automaticamente um cadastro utilizando os mesmos dados no site externo. Os dados do usuário devem ser um item em comum entre os bancos de dados do site externo e do EventCalendar, após o usuário demonstrar interesse em comprar um evento deste site.
Critério de aceite 2 | O cadastro somente será criado no site que o usuário demonstrar interesse em comprar o evento, e deverá ser checado por cybersegurança, garantindo que não serão compartilhados com mais nenhum.

</div>

<div align="center">
<sub>Tabela 03 - US03</sub>
<br>
<br>

Identificação | US03
--- | ---
Persona | Julia Rodrigues
User Story | "como usuária, quero poder filtrar os eventos por proximidade, para ver resultados mais relevantes para mim"
Critério de aceite 1 | CR1: O usuário deve poder compartilhar sua localização com o site, que calculará a distância dos eventos a ele, e mostrará apenas aqueles a um certo raio de distância.
Critério de aceite 2 | CR2: O usuário poderá também selecionar manualmente sua localização, caso esteja procurando eventos que ocorram perto de outro local. Ao selecionar outra localização senão a atual, o site também mostrará o pedido

</div>
---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

#### 3.1.1 Diagrama físico e lógico do banco de dados

O diagrama a seguir foi realizado com o dbdiagram.io. Nele, podem-se observar todas as tabelas criadas.

<div align="center">
    <sub>Figura 01: Diagrama de tabelas do banco de dados</sub>
    <br>
    <img src="/assets/modelo_banco.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Nessa imagem, mostra-se o schema produzido pelo Supabase.

<div align="center">
    <sub>Figura 02: Schema</sub>
    <br>
    <img src="/assets/schema.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

#### 3.1.2 Código SQL

O código SQL utilizado para desenvolver as tabelas foi o seguinte:

``` sql
-- tabela de usuários: contém o nome, id, email, localização e aniversário do usuário.
-- essas informações são todas extremamente necessárias. por exemplo, a localização ajuda a filtrar
-- os shows mais perto, e a idade ajuda a não recomendar shows +18 para usuários menores de idade
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome_usuario TEXT NOT NULL,
  email TEXT NOT NULL,
  localizacao TEXT NOT NULL,
  data_nascimento DATE
);

-- os eventos contém id, nome, tipo (show de música, show de humor, peça de teatro...), localização, data e duração (em horas)
CREATE TABLE eventos (
  id SERIAL PRIMARY KEY,
  nome_evento TEXT NOT NULL,
  tipo TEXT NOT NULL,
  localizacao_evento TEXT NOT NULL,
  data_evento DATE,
  duracao TIMESTAMP
);

-- a inscrição contém id da inscrição, id do usuário e do evento, data da inscrição e status.
-- status pode ser, por exemplo, 'confirmado', 'pendente' ou 'cancelado'.
CREATE TABLE inscricao (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES usuarios(id) on DELETE CASCADE,
    evento_id INT REFERENCES eventos(id) on DELETE CASCADE,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) 
);

-- aqui, podem-se filtrar os eventos por tipo, área, etc
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome_categoria TEXT
);

-- essa tabela relaciona a categoria com o evento
CREATE TABLE categoria_evento (
    evento_id INT REFERENCES eventos(id),
    categoria_id INT REFERENCES categorias(id),
    PRIMARY KEY (evento_id, categoria_id)
);

-- aqui, o usuário pode marcar um evento como favorito, relacionando os usuários com os eventos
CREATE TABLE favoritos (
    user_id INT REFERENCES usuarios(id),
    evento_id INT REFERENCES eventos(id),
    PRIMARY KEY (user_id, evento_id)
);
```

Para redigi-lo, foi utilizado o Supabase. Seu arquivo SQL pode ser encontrado em `scripts/db.sql`.

### 3.1.3 Descrição de tabelas

#### 1. *Tabela eventos*

A tabela eventos tem como atributos id (um inteiro de até 4 dígitos), que é a *chave primária*, nome (texto), tipo (texto), localizacao_evento (texto), data_evento (data) e duracao (time). 

#### 2. *Tabela usuários*

A tabela usuários tem como atributos id (um inteiro de até 4 dígitos), que é a *chave primária*, nome (texto), email (texto), localizacao (texto) e data_nascimento (date).

#### 3. *Tabela inscrição*

A Tabela inscrição tem como atributos id (um inteiro de até 4 dígitos), que é a *chave primária*, user_id (que se relaciona com o id do usuário), evento_id (que se relaciona com o id do evento), data_inscricao (timestamp) e status (varchar(50) - ou seja, um texto com até 50 caracteres).

#### 4. *Tabela categorias* 

A tabela categorias tem como atributos id (um inteiro de até 4 dígitos), que é a *chave primária*, e um nome (texto).

#### 5. *Tabela favoritos*

A tabela favoritos tem como atributos user_id (um inteiro de até 4 dígitos), que se relaciona com o id do usuário e é a *chave primária*, e evento_id (um inteiro de até 4 dígitos), que se relaciona com o id do evento, e é outra *chave primária*.  A chave primária composta significa que um mesmo usuário só pode favoritar o mesmo evento uma vez.

#### 6. *Tabela categoria eventos*

A tabela categoria eventos tem como atributos evento_id (um inteiro de até 4 dígitos), que se relaciona com o id do evento, e é uma *chave primária*, além da categoria_id que se relaciona com o id das categorias, que é outra *chave primária*. A chave primária composta significa que um mesmo evento só pode ter uma categoria.

### 3.2 BD, Models e Arquitetura

No projeto, criei dois Models para os eventos e para os usuários. Neles, são armazenadas as informações sobre os usuários e sobre os eventos, que posteriormente serão passadas para o controller e para os views.

#### 3.2.1. **eventoModel.js**

``` javascript
const db = require('../config/database'); // Importa a conexão com o banco de dados

module.exports = {
  // Busca todos os eventos, ordenando pelo nome do evento
  async findAll() {
    const result = await db.query('SELECT * FROM eventos ORDER BY nome_evento ASC');
    return result.rows; // Retorna todos os eventos encontrados
  },

  // Cria um novo evento com os dados fornecidos
  async create(nome_evento, tipo, localizacao_evento, data_evento, duracao) {
    const query = `
      INSERT INTO eventos (nome_evento, tipo, localizacao_evento, data_evento, duracao)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const result = await db.query(query, [nome_evento, tipo, localizacao_evento, data_evento, duracao]);
    return result.rows[0]; // Retorna o evento criado
  },

  // Atualiza um evento existente pelo ID com os novos dados fornecidos
  async update(id, nome_evento, tipo, localizacao_evento, data_evento, duracao) {
    const query = `
      UPDATE eventos SET nome_evento = $1, tipo = $2, localizacao_evento = $3, data_evento = $4, duracao = $5
      WHERE id = $6 RETURNING *`;
    const result = await db.query(query, [nome_evento, tipo, localizacao_evento, data_evento, duracao, id]);
    return result.rows[0]; // Retorna o evento atualizado
  },

  // Exclui um evento pelo ID
  async delete(id) {
    await db.query('DELETE FROM eventos WHERE id = $1', [id]);
    // Não retorna nada, apenas executa a exclusão
  }
};
```

#### 3.2.2. **userModel.js** 

``` javascript
const db = require('../config/db'); // Importa a conexão com o banco de dados

// Define a classe User para manipulação dos usuários no banco
class User {
  // Busca todos os usuários
  static async getAll() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  }

  // Busca um usuário pelo ID
  static async getById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Cria um novo usuário com os dados fornecidos
  static async create(data) {
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [data.name, data.email]
    );
    return result.rows[0];
  }

  // Atualiza um usuário existente pelo ID
  static async update(id, data) {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [data.name, data.email, id]
    );
    return result.rows[0];
  }

  // Exclui um usuário pelo ID
  static async delete(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0; // Retorna true se algum usuário foi deletado
  }
}

module.exports = User; // Exporta a classe User para uso em outros arquivos
```

#### 3.2.3 Arquitetura

#### 3.2.3.1 O que é Arquitetura MVC?

Um diagrama de arquitetura ajuda na construção e visualização de um banco de dados indiretamente, ao organizar a forma como a aplicação interage com os dados. Ele contribui com clareza na separação de responsabilidades, ajuda a identificar claramente quais classes precisam acessar o banco, e quais dados são importantes.

#### 3.2.3.2 A arquitetura do projeto

Nessa imagem, pode-se observar a arquitetura realizada para o EventCalendar, mostrando todas as relações do framework model, view e controller.

<div align="center">
    <sub>Figura 03: Arquitetura MVC</sub>
    <br>
    <img src="/assets/arquitetura.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

### 3.3. Wireframes

### 3.3.1 Introdução: o que são wireframes?

Wireframes são representações visuais simples e esquemáticas de uma página ou tela de um sistema, site ou aplicativo. Eles mostram a estrutura básica do layout, como a disposição de elementos (como menus, botões, imagens e textos), sem focar em design visual ou cores. Em um projeto, os wireframes ajudam a, por exemplo, planejar a navegação e a hierarquia de informações de forma clara e a economizar tempo e recursos, evitando retrabalho no desenvolvimento. Eles funcionam como um “esqueleto” do projeto, servindo de base para as próximas etapas de design e implementação.

### 3.3.2 Wireframes do projeto

#### 1. *Tela inicial da interface*

<div align="center">
    <sub>Figura 04: Wireframe 01</sub>
    <br>
    <img src="/assets/wireframe1.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Nessa tela, pode-se observar a homepage do EventCalendar. Nela, é possível ver, de cima para baixo:

1. A header do site, com a logo à esquerda, uma caixa que indica o usuário logado à direita e uma caixa de "meus eventos"

2. Uma barra lateral à esquerda com filtros que o usuário pode aplicar nos eventos, como proximidade, tipo ou duração

3. Os eventos, representados por retângulos, e símbolos que descreveriam brevemente suas características

4. Um texto, acima dos eventos, que convida o usuário a procurar um evento (Algo como "Comece a buscar o melhor evento para você")

Essa tela, além de ser a tela principal do site, atende à funcionalidade pedida pela US03, que diz que o usuário deseja poder filtrar os eventos.

#### 2. *Tela com um lembrete para usuário*

<div align="center">
    <sub>Figura 05: Wireframe 02</sub>
    <br>
    <img src="/assets/wireframe2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Nessa tela, pode-se observar o processo de lembrete de um evento que está se aproximando. Ela aparece após o usuário inscrever-se ou favoritar um evento, na tela de visualização de evento. O evento, na homepage, fica em destaque, para indicar sua maior relevância, e uma notificação aparece no site, lembrando que a data do evento está se aproximando.

#### 3. *Tela de visualização de um evento*

<div align="center">
    <sub>Figura 06: Wireframe 03</sub>
    <br>
    <img src="/assets/wireframe3.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Nessa tela, pode-se observar a tela de visualização de um evento após clicar nele na tela inicial. Nela, pode-se observar:

1. A header do site, com a logo à esquerda, uma caixa que indica o usuário logado à direita e uma caixa de "meus eventos"

2. Uma foto do evento

3. Uma descrição do evento, com todas as informações necessárias

4. Um botão de inscrever-se e uma estrela que representa o botão de "favoritar um evento"

Essa tela se relaciona com a usabilidade geral do usuário no website.

[Clique aqui](https://www.figma.com/design/dexDPEvhRXG7GlU4GPbB7h/Untitled?node-id=0-1&t=uEx67nqFiP5MppRX-1) para acessar o figma com os wireframes mais detalhadamente.

### 3.4. Guia de estilos

#### O que é um guia de estilos?

Um guia de estilos é um documento que define padrões visuais e de comunicação para um site ou marca. Ele especifica elementos como tipografia, cores principais e secundárias, uso de logotipos e estilo de botões, formulários e ícones. O guia de estilos garante consistência visual e eficiência no desenvolvimento, pois ajuda a seguir as mesmas diretrizes. Isso facilita a manutenção do site, acelera a criação de novas páginas e melhora a experiência do usuário, já que tudo fica coeso e profissional.

#### Guia de estilos do projeto

Essas são as páginas do guia de estilos desenvolvido para o EventCalendar.

<div align="center">
    <sub>Figura 07: Guia de estilos </sub>
    <br>
    <img src="/assets/guia_1.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 08: Sumário </sub>
    <br>
    <img src="/assets/guia_2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 09: Overview </sub>
    <br>
    <img src="/assets/guia_3.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 10: Tipografia (1) </sub>
    <br>
    <img src="/assets/guia_4.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 11: Tipografia (2) </sub>
    <br>
    <img src="/assets/guia_5.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 12: Paleta de cores </sub>
    <br>
    <img src="/assets/guia_6.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 13: Botões </sub>
    <br>
    <img src="/assets/guia_7.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 14: Layout Geral </sub>
    <br>
    <img src="/assets/guia_8.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 15: Uso da logo </sub>
    <br>
    <img src="/assets/guia_9.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

[Clique aqui](https://www.canva.com/design/DAGoBYBX1SQ/Ef2gMc6JqNgwMdkON2iWFg/edit?utm_content=DAGoBYBX1SQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) para acessar o canva com o guia de estilos mais detalhadamente.


#### 3.4.1. Cores

Como foi possível observar no guia de estilos, as cores principais são azul (#1667A9), amarelo (#F8C531), cinza-claro (#F2F2F2) e cinza-escuro (#252626). Algumas dessas cores também compõem a logo.

#### 3.4.2. Tipografia

Como foi possível observar no guia de estilos, as fontes principais são League Spartan e Montserrat. A primeira é mais usada para títulos e outros textos em destaque. A Montserrat, podendo ser usada tanto na versão normal quanto em negrito, é incorporada aos demais textos do site.

#### 3.4.3. Iconografia e imagens 

Como foi possível ver no guia de estilos, os ícones utilizados são principalmente botões. Na figura 13, podem-se observar ícones que seguem a paleta de cores principal, e representam, respectivamente (observando o lado direito da imagem; de cima para baixo; da esquerda para a direita), o ícone de notificações; o mesmo ícone mas com uma notificação não lida, o ícone que direciona para o perfil do usuário, o botão de configurações, um botão de estrela que significa "adicionar como favorito" e uma caixa de marcação, a ser usada na área de filtros, marcada com um *checkmark*.

### 3.5. Protótipo de alta fidelidade

#### 3.5.1 O que é um protótipo de alta fidelidade?

Um protótipo de alta fidelidade é uma simulação visual detalhada de um site ou aplicativo que se assemelha muito ao produto final. Ele inclui layouts realistas, tipografia e cores definidas e imagens e ícones finais ou próximos dos finais. Ele ajuda no desenvolvimento de um website de plataforma de eventos pois traz uma visualização clara do site antes da codificação, além de oferecer uma base para desenvolvimento, servindo como referência direta para a implementação do site, acelerando o processo e garantindo fidelidade ao design.

#### 3.5.2 O protótipo do projeto

Aqui, encontram-se algumas imagens do protótipo de alta fidelidade desenvolvido usando o Figma com base nos wireframes. As alterações feitas desde o wireframe foram apenas melhorias, com nenhuma alteração nos elementos visuais, apenas nos filtros, que agora se encontram com uma barra de seleção para o tipo de filtro ou barra para ajuste de localização. Essas alterações visam cumprir ainda mais com a US03.

<div align="center">
    <sub>Figura 16: página inicial </sub>
    <br>
    <img src="/assets/mockup_1.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 17: página de eventos </sub>
    <br>
    <img src="/assets/mockup_2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 18: página inicial com notificação </sub>
    <br>
    <img src="/assets/mockup_3.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

[Clique aqui](https://www.figma.com/design/j7xBOORsDUbtFjDBXRXs43/prototipo?node-id=20-36&t=7PaeUd4BrP8VEseA-1) para acessar o protótipo diretamente no figma. Lá, podem-se observar, também, os wireframes para comparação e algumas anotações sobre usabilidade.

#### 3.5.3 Uso de grids

O protótipo foi desenvolvido pensando na coerência visual e também detalhista. Por isso, o uso de grids foi constante para alinhar as informações na página da melhor forma possível. Isso pode ser observado pelas imagens a seguir:

<div align="center">
    <sub>Figura 19: página inicial com grid </sub>
    <br>
    <img src="/assets/grid_1.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 20: página de eventos com grid </sub>
    <br>
    <img src="/assets/grid_2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 21: página inicial com notificação com grid </sub>
    <br>
    <img src="/assets/grid_3.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

### 3.6. WebAPI e endpoints

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web

### 4.1 Demonstração do Sistema Web

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*

---

## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---

# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto

EventCalendar

#### Autor do projeto

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

<p align="center">
<a><img src="/assets/persona1.png" alt="Persona 1 - Julia Rodrigues" border="0"></a>
</p>

### 2.2. User Stories

Identificação | US01
--- | ---
Persona | Julia Rodrigues
User Story | "Como alguém que não consegue lembrar muito bem de datas de shows, quero receber notificações quando as vendas de um show se aproximarem, para não perder nenhuma oportunidade de ir a esses eventos"
Critério de aceite 1 | CR1: as notificações devem chegar ao usuário por meio de emails. Um email deve ser mandado ao usuário quando faltar, respectivamente, 1 semana e 1 dia para o início das vendas.
Critério de aceite 2 | CR2: as notificações devem também aparecer no site. Quando entrar no site, no período de tempo de lembrete para o evento, uma notificação deve aparecer.
Critérios INVEST | A garantia das notificações não interfere em demais features do site (I); Pode ser ajustada com base no interesse do usuário em atender ou não tal evento (N); Soluciona uma das dores da persona (o não lembrete constante) (V); É fácil de ser estimada em duração e complexidade pelo time de desenvolvimento, e não atrapalha o desenvolvimento de demais integrações (E); Pode ser completa em um período de tempo razoável, por não ser uma contribuição muito complicada ao projeto (S); Pode ser facilmente testada após realizarem-se os critérios de testes para o aceite (por exemplo, demonstrar interesse em um evento no site deve ser o bastante para garantir o funcionamento dessa usabilidade) (T).

Identificação | US02
--- | ---
Persona | Julia Rodrigues
User Story | "como usuária, quero que o cadastro nos sites de eventos seja unificado, para que isso não se torne um empecilho para comprar um ingresso de um show"
Critério de aceite 1 | CR1: O usuário, ao se cadastrar no EventCalendar, poderá compartilhar seus dados e criar automaticamente um cadastro utilizando os mesmos dados no site externo. Os dados do usuário devem ser um item em comum entre os bancos de dados do site externo e do EventCalendar, após o usuário demonstrar interesse em comprar um evento deste site.
Critério de aceite 2 | O cadastro somente será criado no site que o usuário demonstrar interesse em comprar o evento, e deverá ser checado por cybersegurança, garantindo que não serão compartilhados com mais nenhum.


Identificação | US03
--- | ---
Persona | Julia Rodrigues
User Story | "como usuária, quero poder filtrar os eventos por proximidade, para ver resultados mais relevantes para mim"
Critério de aceite 1 | CR1: O usuário deve poder compartilhar sua localização com o site, que calculará a distância dos eventos a ele, e mostrará apenas aqueles a um certo raio de distância.
Critério de aceite 2 | CR2: O usuário poderá também selecionar manualmente sua localização, caso esteja procurando eventos que ocorram perto de outro local. Ao selecionar outra localização senão a atual, o site também mostrará o pedido


---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

*Posicione aqui os diagramas de modelos relacionais do seu banco de dados, apresentando todos os esquemas de tabelas e suas relações. Utilize texto para complementar suas explicações, se necessário.*

*Posicione também o modelo físico com o Schema do BD (arquivo .sql)*

### 3.1.1 BD e Models
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*

#### 3.4.1. Cores

*Apresente aqui a paleta de cores, com seus códigos de aplicação e suas respectivas funções.*

#### 3.4.2. Tipografia

*Apresente aqui a tipografia da solução, com famílias de fontes e suas respectivas funções.*

#### 3.4.3. Iconografia e imagens 

*(esta subseção é opcional, caso não existam ícones e imagens, apague esta subseção)*

*Posicione aqui imagens e textos contendo exemplos padronizados de ícones e imagens, com seus respectivos atributos de aplicação, utilizadas na solução.*

### 3.5. Protótipo de alta fidelidade

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

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

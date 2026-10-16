# TECHSPEC - MVP 01: Biblioteca pessoal de jogos

## 1. Objetivo da arquitetura

A arquitetura proposta para o MVP 01 prioriza simplicidade, baixo acoplamento e persistência local confiável em navegador. O foco está em um front-end de biblioteca pessoal de jogos, com estrutura clara de domínio, UI e dados, sem backend.

## 2. Decisões técnicas baseadas no projeto

- React + TypeScript + Vite como base de desenvolvimento.
- CSS simples e direto, sem frameworks de UI extras.
- LocalStorage para persistência dos dados textuais dos jogos.
- IndexedDB reservado apenas para a futura galeria de screenshots e binários.
- Vitest + React Testing Library como base para testes automatizados.
- Separação entre dados, lógica de negócio e componentes visuais.
- Sem autenticação, backend, sincronização remota ou integrações externas.

## 3. Visão geral da solução

A aplicação será organizada em camadas básicas:

1. Camada de apresentação: componentes React, páginas e layouts.
2. Camada de domínio: tipos, validadores e regras do jogo.
3. Camada de persistência: serviços locais para leitura e escrita no LocalStorage.
4. Camada de testes: testes de comportamento e validação da lógica principal.

Este desenho permite evoluir o projeto sem misturar regras de negócio com a interface.

## 4. Estrutura de diretórios proposta

```text
src/
  app/
    App.tsx
    routes.tsx
  components/
    GameCard.tsx
    GameForm.tsx
    GameDetail.tsx
    EmptyState.tsx
    SearchBar.tsx
    Layout.tsx
  features/
    games/
      GameListPage.tsx
      GameDetailPage.tsx
      useGames.ts
  domain/
    game.ts
    validation.ts
  storage/
    localStorage.ts
    schema.ts
  styles/
    globals.css
    tokens.css
  utils/
    formatters.ts
    ids.ts
  hooks/
    useLocalStorage.ts
  tests/
    setupTests.ts
    GameList.test.tsx
    GameForm.test.tsx
```

Observações:

- A estrutura acima é proposta para o planejamento inicial e pode ser ajustada conforme a implementação evoluir.
- A organização por funcionalidade e domínio foi priorizada em vez de uma estrutura excessivamente genérica.
- A galeria de screenshots não deve entrar no MVP 01; o espaço para IndexedDB fica reservado para a próxima etapa.

## 5. Modelo de dados inicial

### 5.1 Tipo Game

```ts
export type GameStatus =
  | 'nao-iniciado'
  | 'em-andamento'
  | 'concluido'
  | 'abandonado';

export interface Game {
  id: string;
  name: string;
  platform: string;
  genre: string;
  developer: string;
  releaseDate?: string;
  coverImage?: string; // URL da capa do jogo
  status: GameStatus;
  rating?: number;
  comment?: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 5.2 Regras de domínio

- nome deve ser obrigatório;
- status deve obedecer a uma enumeração controlada;
- avaliação deve ser opcional e, se informada, respeitar intervalo definido pela UI;
- favorito deve ser booleano;
- `createdAt` e `updatedAt` devem ser registrados em ISO string;
- `coverImage` deve ser opcional na fase inicial e representar uma URL válida para a capa do jogo, sem upload de arquivo neste MVP.

### 5.3 Estrutura de persistência

A persistência será feita em um único bucket de dados em LocalStorage, com layout versionado:

```ts
interface GameStorageEnvelope {
  version: number;
  updatedAt: string;
  games: Game[];
}
```

Isso facilita futura migração de schema e reduz risco de corrupção de dados.

## 6. Estratégia de persistência local

### 6.1 LocalStorage para dados textuais

- Dados dos jogos em formato JSON.
- Leitura e escrita encapsuladas em um módulo dedicado.
- Operações essenciais: `loadGames`, `saveGames`, `createGame`, `updateGame`, `deleteGame`.
- Validação antes de sobrescrever dados existentes.
- Tratamento de falhas de parse e corrupção de armazenamento.

### 6.2 Validação e integridade

- Verificar se o payload carregado é um JSON válido.
- Validar estrutura do objeto antes de aceitar dados.
- Garantir `id` estável para evitar duplicidade.
- Manter `updatedAt` consistente em cada modificação.
- Não apresentar sucesso antes de confirmar gravação final.

### 6.3 Uso de IndexedDB

- Mantém-se reservado para a próxima etapa de screenshots.
- Não deve aparecer na implementação do MVP 01 como funcionalidade ativa.
- A arquitetura deve permitir a futura extensão sem reescrever a camada de domínio.

## 7. Fluxo de dados

1. Usuário interage com o formulário ou a biblioteca.
2. A camada de domínio valida os dados.
3. O serviço de persistência grava os dados em LocalStorage.
4. O estado da UI é atualizado com o resultado da operação.
5. Em caso de erro, o usuário recebe feedback claro e a aplicação mantém estado estável.

## 8. Estratégia de UI

### 8.1 Direção visual

- fundos escuros ou grafite;
- foco em capas de jogos;
- tipografia expressiva para títulos;
- cards com hierarquia visual clara;
- layouts com espaço generoso e composição editorial.

### 8.2 Layouts previstos

- Header com título da coleção e área de busca.
- Biblioteca em grid responsivo.
- Painel lateral ou modal para detalhes.
- Formulários em layout único e simples.
- Estado vazio com ilustração mínima ou mensagem informativa.

## 9. Estratégia de testes

### 9.1 Cobertura mínima recomendada

- teste de renderização da biblioteca vazia;
- teste de criação de jogo com dados válidos;
- teste de validação de campos obrigatórios;
- teste de persistência após recarga/refresh;
- teste de edição e remoção de registros;
- teste de comportamento responsivo em tamanhos básicos de tela.

### 9.2 Ferramentas

- Vitest para execução dos testes.
- React Testing Library para interação com componentes e UX.
- Setup de testes para `jsdom` e mocks mínimos do LocalStorage.

### 9.3 Critério de adequação

Os testes devem validar comportamento real da interface e não apenas mockar estrutura visual. O objetivo é verificar fluxo de criação, leitura, edição e persistência local.

## 10. Regras de implementação esperadas

- não acessar LocalStorage diretamente em múltiplos componentes;
- centralizar validação em funções específicas;
- manter `GameForm`, `GameCard` e `GameDetail` desacoplados da infraestrutura de armazenamento;
- evitar abstrações genéricas sem necessidade real;
- priorizar clareza e consistência do código sobre complexidade teórica.

## 11. Limites do escopo do MVP 01

- não incluir screenshots;
- não incluir upload de imagens;
- não incluir sincronização entre dispositivos;
- não incluir backend ou autenticação;
- não incluir filtros avançados, estatísticas, importação/exportação ou integrações externas nesta etapa.

## 12. Critérios de sucesso da arquitetura

A arquitetura do MVP 01 será aceita quando:

- o código for organizado por responsabilidade e fácil de evoluir;
- os dados forem persistidos localmente de forma previsível;
- o sistema permitir teste de comportamento principal sem dependência de backend;
- a estrutura suportar extensão futura para screenshots e outros recursos;
- o front-end respeita as regras de design e usabilidade do projeto.

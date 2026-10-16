# Tarefa 02: Modelo de domínio e persistência local

## Objetivo

Definir o modelo de dados do jogo, as regras de validação e a camada de persistência em LocalStorage, garantindo que a biblioteca funcione com segurança após recarga da aplicação.

## Pré-requisitos

- Tarefa 01 concluída.
- Definição do escopo do MVP 01 já aprovada.

## Arquivos afetados previstos

- src/domain/game.ts
- src/domain/validation.ts
- src/storage/localStorage.ts
- src/storage/schema.ts
- src/utils/ids.ts
- src/tests/setupTests.ts

## Critérios de aceitação

- o tipo `Game` está definido com os campos essenciais do MVP 01;
- as regras de validação do nome e do status estão implementadas;
- a persistência em LocalStorage está encapsulada em módulo próprio;
- as operações de leitura, criação, edição e remoção estão definidas;
- os dados podem ser carregados e salvos sem quebrar ao recarregar a aplicação;
- a estrutura está pronta para futura extensão com IndexedDB e screenshots sem mudar a lógica central do domínio.

## Entregável

Camada de domínio e persistência pronta, com regras mínimas de validação e infraestrutura local segura para a coleção.

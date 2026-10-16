# GameShelf

Biblioteca pessoal de jogos eletrônicos com visual editorial, foco em capas, organização local e persistência no navegador.

## Funcionalidades do MVP 01

- Biblioteca visual com cards de jogos
- Cadastro, edição e remoção de títulos
- Detalhes do jogo com status, avaliação e comentário
- Busca por nome
- Persistência local em LocalStorage
- Estados vazios e validação de campos obrigatórios
- Interface responsiva em CSS puro

## Stack

- React
- TypeScript
- Vite
- CSS puro
- Vitest + React Testing Library

## Como executar

```bash
npm install
npm run dev
```

Depois abra a URL que o Vite informar no terminal, normalmente:

```text
http://localhost:5173
```

## Como testar

```bash
npm test -- --run
```

## Como compilar para produção

```bash
npm run build
```

## Observações

- A capa do jogo é um campo de URL inicial.
- A aplicação é local-first e não inclui backend, autenticação ou sincronização remota.
- O armazenamento de screenshots fica reservado para a próxima etapa.

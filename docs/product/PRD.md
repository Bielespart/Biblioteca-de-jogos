# PRD - MVP 01: Biblioteca pessoal de jogos

## 1. Visão geral

Este documento define os requisitos, o escopo, os casos de uso e os critérios de aceitação do MVP 01 da aplicação de biblioteca pessoal de jogos eletrônicos.

O objetivo principal é entregar uma primeira versão funcional, local e independente de backend, com interface editorial elegante, priorizando capas, tipografia expressiva e uma navegação clara em dispositivos desktop e mobile.

O MVP 01 deve permitir ao usuário:

- visualizar a biblioteca pessoal em grade ou lista visual;
- cadastrar novos jogos com dados essenciais;
- editar e remover jogos já cadastrados;
- abrir o detalhe de cada jogo;
- acompanhar status de progresso, avaliação e comentário pessoal;
- persistir os dados no navegador após recarregar a aplicação;
- lidar com estados vazios, erros de validação e comportamento responsivo.

## 2. Objetivo do produto

Construir uma aplicação web local para organizar uma coleção pessoal de jogos, com foco em descoberta visual e atualização constante da biblioteca. A experiência deve parecer uma edição editorial de coleções digitais, mantendo funcionalidade simples, direta e confiável.

## 3. Premissas e decisões iniciais

- Stack recomendada: React + TypeScript + Vite.
- Estilização: CSS simples e direto, sem framework de UI adicional.
- Persistência textual: LocalStorage.
- Persistência binária: IndexedDB reservado para futura galeria de screenshots.
- Não há backend, autenticação, sincronização ou banco remoto.
- Testes: Vitest + React Testing Library, se compatíveis com a stack.
- Escopo desta entrega: biblioteca, cadastro, detalhe, persistência e validação.

## 4. Escopo do MVP 01

### 4.1 Funcionalidades incluídas

- Visualização da biblioteca pessoal com cards de jogos.
- Busca por nome.
- Cadastro de novo jogo.
- Edição de jogo existente.
- Remoção de jogo.
- Página ou painel de detalhes do jogo.
- Campos de status de progresso, favorito, avaliação, comentário e capa por URL.
- Persistência local após recarregar a aplicação.
- Estados vazios e feedback visual para ausência de dados.
- Validação de campos obrigatórios.
- Responsividade em telas de computador, tablet e celular.

### 4.2 Funcionalidades excluídas

- Backend ou APIs externas.
- Autenticação de usuários.
- Sincronização entre dispositivos.
- Upload, gerenciamento ou galerias de screenshots.
- Filtros avançados, estatísticas e análise de coleção.
- Importação/exportação de backup de biblioteca.
- Integrações com serviços externos.
- Calendários, conquistas, metas, recomendações ou multiplayer.

## 5. Usuários e personas

### 5.1 Usuário principal

Jogador pessoal que mantém uma coleção de jogos e deseja organizar, avaliar e acompanhar o que já jogou, está jogando ou pretende jogar.

### 5.2 Necessidades principais

- encontrar jogos rapidamente;
- registrar informações essenciais sem esforço;
- manter a coleção organizada visualmente;
- consultar detalhes sem sair da experiência principal;
- preservar os dados ao recarregar a aplicação.

## 6. Casos de uso principais

### Caso de uso 01: visualizar a coleção

- O usuário abre a aplicação.
- O sistema carrega os jogos salvos.
- A biblioteca é exibida em grade visual com capas e informações relevantes.
- Se não houver registros, a interface mostra estado vazio com instruções claras.

### Caso de uso 02: cadastrar um jogo

- O usuário acessa o formulário de criação.
- Preenche nome, plataforma, gênero, desenvolvedora/publicadora, data de lançamento e status de progresso.
- O sistema valida os campos obrigatórios.
- Ao confirmar, o jogo é salvo localmente e exibido na biblioteca.

### Caso de uso 03: editar um jogo

- O usuário seleciona um jogo existente.
- O sistema abre o formulário de edição com os dados já preenchidos.
- O usuário altera informações e salva as mudanças.
- O sistema atualiza a biblioteca e a visualização de detalhe.

### Caso de uso 04: remover um jogo

- O usuário seleciona a ação de exclusão.
- O sistema confirma a ação.
- O jogo é removido da biblioteca e não permanece em localStorage.

### Caso de uso 05: consultar detalhes

- O usuário abre um jogo da biblioteca.
- O sistema mostra os dados do jogo, avaliação, comentário e status.
- O usuário pode retornar à biblioteca sem perder o restante da experiência.

### Caso de uso 06: recuperar estado após recarga

- O usuário fecha e reabre a aplicação.
- O sistema recarrega as informações persistidas em LocalStorage.
- A interface mantém a coleção e os campos atualizados.

## 7. Requisitos funcionais

### RF-01: Biblioteca visual

O sistema deve exibir uma coleção de jogos em visual editorial, com cards visualmente atraentes e informações compactas.

### RF-02: Cadastro de jogos

O sistema deve permitir criar um registro com dados essenciais de um jogo.

### RF-03: Edição e exclusão

O sistema deve permitir alterar e remover registros existentes.

### RF-04: Detalhe do jogo

O sistema deve existir uma página ou painel que apresente todos os dados principais do jogo.

### RF-05: Status, avaliação e comentário

O sistema deve permitir registrar status de progresso, favorito, avaliação pessoal e comentário público ao usuário.

### RF-06: Busca por nome

O usuário deve poder localizar jogos pelo nome.

### RF-07: Persistência após recarga

Os dados de jogos devem permanecer salvos e restaurados ao abrir a aplicação novamente.

### RF-08: Validação

O sistema deve impedir criação ou edição com dados inválidos, especialmente ausência de nome ou campos críticos.

### RF-09: Estados vazios e erro

A interface deve comunicar quando não há jogos, quando os dados não puderam ser carregados e quando uma operação falhar.

### RF-10: Responsividade

A aplicação deve funcionar em diferentes tamanhos de tela sem quebrar a navegação ou a leitura.

## 8. Requisitos não funcionais

### RNF-01: Local-first

Os dados devem permanecer no navegador e não exigir infraestrutura externa.

### RNF-02: Persistência mínima confiável

A persistência deve ser tratada com validação de dados e verificação de operação concluída antes de apresentar sucesso.

### RNF-03: Simplicidade de manutenção

A lógica de negócio deve ser separada da apresentação visual para facilitar testes e ajustes futuros.

### RNF-04: Acessibilidade básica

Elementos interativos devem possuir labels, foco visível e contraste legível.

### RNF-05: Desempenho aceitável

A interface deve carregar e listar a quantidade esperada de registros sem lentidão excessiva.

## 9. Critérios de aceitação do MVP 01

O MVP 01 será considerado concluído quando:

1. a aplicação exibe uma biblioteca funcional com pelo menos os jogos cadastrados;
2. o usuário consegue criar, editar e remover um jogo sem erros de fluxo;
3. os dados persistem após recarregar a página;
4. a tela mostra estado vazio quando não há registros;
5. campos obrigatórios são validados e o usuário recebe feedback claro;
6. a interface mantém legibilidade e usabilidade em telas pequenas e grandes;
7. a experiência visual respeita a proposta editorial, com foco em capas e tipografia forte;
8. nenhum recurso fora do escopo do MVP 01 aparece como funcional na interface;
9. testes principais cobrem os fluxos críticos de leitura e escrita local.

## 10. Riscos e limitações

- O LocalStorage tem limites de armazenamento e deve ser usado apenas para dados textuais leves.
- A aplicação será local e não deve ser apresentada como sincronizada entre dispositivos.
- A ausência de screenshots e de IndexedDB em MVP 01 reduz o peso visual, mas mantém o foco no objetivo principal.
- O design editorial deve ser implementado sem comprometer a clareza da interface.

## 11. Entregável esperado

A entrega final do MVP 01 deve consistir em uma aplicação local, funcional e visualmente refinada, com biblioteca pessoal, cadastro e detalhe de jogos, persistência local e validação básica, conforme os critérios acima.

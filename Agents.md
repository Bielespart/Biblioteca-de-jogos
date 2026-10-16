1. Objetivo do projeto

Construir uma aplicação web pessoal para gerenciamento de jogos eletrônicos, com uma experiência editorial elegante, intuitiva e visualmente centrada em capas e screenshots.

A aplicação permitirá organizar uma biblioteca pessoal, acompanhar o progresso, registrar avaliações e comentários e manter uma galeria de screenshots favoritas associadas aos jogos.

O projeto será inicialmente local, sem backend, autenticação ou sincronização entre dispositivos.

2. Decisões técnicas iniciais
Priorizar a tecnologia já existente no repositório, se estiver adequada.
Se o projeto estiver realmente vazio e nenhuma stack tiver sido escolhida, utilizar React, TypeScript e Vite.
Utilizar CSS simples e direto, sem frameworks de UI extras.
Manter a lógica de negócio independente dos componentes visuais.
Utilizar LocalStorage para persistir os dados textuais da biblioteca.
Utilizar IndexedDB para persistir screenshots e outros arquivos binários.
Não adicionar backend, autenticação, banco de dados remoto ou serviços pagos nesta fase.
Adotar testes automatizados proporcionais à complexidade das funcionalidades.

Essas decisões são a base inicial e poderão ser revistas diante de limitações técnicas concretas.

3. Identidade visual

A aplicação deve seguir uma direção visual editorial, elegante e contemporânea, inspirada em publicações de design e coleções digitais de jogos.

Princípios:

Dar protagonismo às capas e screenshots.
Utilizar tipografia expressiva e hierarquia visual consistente.
Combinar títulos com personalidade e textos de interface legíveis.
Preferir fundos escuros ou grafite, com cores de destaque controladas.
Utilizar espaçamento generoso, alinhamentos cuidadosos e composição visual equilibrada.
Criar cartões de jogos visualmente atraentes, sem excesso de informações.
Reservar layouts assimétricos para áreas de destaque e utilizar grades claras para a biblioteca.
Aplicar animações sutis, sem prejudicar o desempenho ou a acessibilidade.
Manter consistência entre a biblioteca, os detalhes do jogo, os formulários e a galeria.
Garantir responsividade em computadores, tablets e celulares.

Evitar aparência de painel administrativo genérico, excesso de neon, gradientes decorativos, sombras exageradas e elementos sem função.

Não sacrificar legibilidade, acessibilidade ou facilidade de navegação em nome da estética.

4. Funcionalidades da primeira versão

Priorizar:

Visualização da biblioteca pessoal.
Cadastro, edição e remoção de jogos.
Página ou painel de detalhes de cada jogo.
Avaliação pessoal, comentários, favoritos e status de progresso.
Busca por nome.
Adição e visualização de screenshots.
Persistência dos dados após recarregar ou reabrir a aplicação.
Tratamento de erros e estados vazios.
Exportação e importação de backup da biblioteca.

Filtros avançados, estatísticas, integrações externas e outras funcionalidades devem ser adicionados depois que os fluxos principais estiverem estáveis.

5. Modelo de dados

Definir tipos explícitos para os registros principais.

Um jogo deve possuir, quando aplicável:

Identificador estável.
Nome.
Plataforma.
Gênero.
Desenvolvedora ou publicadora.
Data de lançamento.
Referência à capa.
Status de progresso.
Avaliação pessoal.
Comentário pessoal.
Indicador de favorito.
Data de criação e última atualização.

Uma screenshot deve possuir:

Identificador estável.
Identificador do jogo associado.
Nome ou descrição opcional.
Tipo de arquivo e metadados necessários.
Data de criação ou inclusão.

Campos opcionais não devem ser obrigatórios sem justificativa.

As imagens binárias devem ser armazenadas separadamente dos metadados do jogo. Utilize referências estáveis para relacionar os registros e evite armazenar grandes imagens diretamente no LocalStorage.

6. Persistência e acesso aos dados

Isolar o acesso ao armazenamento em módulos próprios.

Não acessar LocalStorage ou IndexedDB diretamente em vários componentes de interface.
Definir operações claras para criar, consultar, atualizar e remover registros.
Tratar falhas de leitura, gravação, corrupção de dados e limites de armazenamento.
Não indicar sucesso antes de confirmar que a operação de persistência foi concluída.
Manter os identificadores e relacionamentos consistentes.
Planejar versionamento do formato dos dados para futuras alterações.
Implementar exportação e importação com validação antes de substituir dados existentes.
Informar ao usuário quando uma operação de armazenamento falhar.

A persistência no navegador não equivale a um backup garantido. Não prometa sincronização entre dispositivos ou recuperação automática de dados.

7. Gerenciamento de imagens
Aceitar somente os formatos de imagem definidos pela aplicação.
Validar tipo e tamanho dos arquivos.
Apresentar feedback durante o processamento.
Exibir mensagens claras para falhas de upload ou armazenamento.
Gerar pré-visualizações de forma eficiente.
Revogar URLs temporárias de objetos quando não forem mais necessárias.
Garantir que a exclusão de um jogo e de suas imagens respeite as regras de integridade definidas.
Evitar carregar todas as imagens em resolução máxima na biblioteca.
Utilizar dimensões e técnicas de carregamento apropriadas para capas e galerias.
8. Organização do código

Organizar a aplicação por responsabilidades e funcionalidades.

Manter componentes visuais separados do acesso a dados.
Agrupar funcionalidades relacionadas a jogos e screenshots.
Centralizar tipos e regras de validação quando apropriado.
Reutilizar componentes quando isso melhorar a consistência.
Evitar abstrações genéricas sem necessidade real.
Não criar uma estrutura de pastas extensa antes de existir código que a justifique.
9. Critérios de aceitação

Uma funcionalidade só está concluída quando:

Seu comportamento principal funciona.
A interface segue a identidade visual do projeto.
Os dados são validados e persistidos corretamente.
Os estados de carregamento, sucesso, vazio e erro relevantes são tratados.
O comportamento é utilizável em diferentes tamanhos de tela.
Os testes pertinentes são executados ou suas limitações são informadas.
Não existem controles apresentados como funcionais que não executem suas ações.
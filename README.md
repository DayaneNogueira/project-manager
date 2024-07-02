# Sistema de Gerenciamento de Projetos e Tarefas

Um sistema desenvolvido em Node.js para gerenciar projetos e tarefas, permitindo aos usuários criar, visualizar, editar e excluir projetos e tarefas associadas.

## Índice

1. Instalação
2. Como Usar

## Instalação
1. Clone o repositório:
   git clone https://github.com/usuario/nome-projeto.git
   cd nome-projeto

2. Instale as dependências
   npm install 
   npm start (iniciar o servidor)

## Como Usar

1. Criação de Usuário
   Cria um novo usuário com nome, email e senha.
   Autentica o usuário e retorna um token JWT para sessões autenticadas.

2. Gerenciamento de Projetos
   Cria um novo projeto.
   Retorna a lista de projetos do usuário autenticado.
   Atualiza um projeto existente.
   Exclui um projeto.

3. Gerenciamento de Tarefas
   Cria uma nova tarefa associada a um projeto existente.
   Retorna a lista de tarefas de um projeto, filtradas por status.
   Atualiza uma tarefa existente.
   Exclui uma tarefa.



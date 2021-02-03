<p align="center">
  <img src="https://github.com/datasmartlab/fullstack-challenge/blob/main/.github/assets/logo.png" height="150" width="150" alt="Datasmart" />
</p>

<h3 align="center">Datasmart</h3>

<p align="center">Desafio para os candidatos à vaga de desenvolvedor Fullstack na Datasmart.</p>

<p align="center">:pushpin: Local de trabalho: Avaré - SP</p>

<br>

<div align="center">
  <a href="#memo-apresentação">Apresentação</a>   |   <a href="#clipboard-instruções">Instruções</a>   |   <a href="#wrench-especificações-técnicas">Especificações técnicas</a>   |   <a href="#gear-especificações-funcionais">Especificações funcionais</a>   |   <a href="#heavy_check_mark-o-que-será-avaliado">O que será avaliado?</a>   |   <a href="#question-dúvidas">Dúvidas</a>
</div>

<br>

## :memo: Apresentação

O desafio é desenvolver um CRUD de produtos em uma API (backend) e consumir os dados desta API em uma aplicação responsiva (frontend), seguindo todas as especificações abaixo.

Esse desafio é um teste de nivelamento e para avaliarmos o quão bom você é :)

O desafio é público e todos os interessados que fizerem pull request receberão um feedback da nossa equipe.

Esperamos que todas as pessoas que queiram trabalhar conosco tentem realizá-lo.

A Datasmart trabalha sempre com feedbacks construtivos e, portanto, daremos sempre uma atenção especial para todos que submeterem o teste. Vale a pena tentar! :)

## :clipboard: Instruções

1. Faça um fork desse projeto;

2. Crie uma branch para o seu desafio no padrão: `git checkout -b fullstack-challenge/seu-nome-sobrenome`;

3. Crie uma pasta `backend` e outra `frontend` para colocar os projetos;

4. Realize o desafio seguindo a seção de especificações;

5. Crie um README com uma descrição e instruções para compilar e rodar o projeto;

6. Adicione seu desafio para transferência `git add .`;

7. Faça commit do seu desafio `git commit -m 'Challenge'`;

8. Faça o push da branch: `git push origin fullstack-challenge/seu-nome-sobrenome`;

9. Abra um pull request com o nome `Challenge: Seu Nome Sobrenome`;

10. Envie um email para `vagas@datasmart.com.br` com o título: `Desenvolvedor Fullstack - Seu Nome Sobrenome`. Adicione seu telefone, LinkedIn, seu perfil do GitHub e em anexo seu currículo.

## :wrench: Especificações técnicas

### Backend

- Utilizar Node.js

- Usar framework Express.js

- Utilizar Sequelize para ORM

- Utilizar Yup para validar a entrada de dados

- Utilizar banco de dados MySQL

- Usar o Insomnia para exportar as rotas

### Frontend

- Utilizar framework ReactJS;

- Usar Redux para estado dos componentes;

- Utilizar Material UI para design;

- Usar styled-components para CSS;

- Mobile first e responsivo;

- Cores, layout e imagens são livres para sua criatividade;

## :gear: Especificações funcionais

### Backend

- A API deve conter as migrations, modelos (models), controles (controllers) e rotas (routes).

- Deve ser criado um CRUD de produtos (get, post, put, delete) com os campos nome, descrição e preço do produto.

- Ao ocorrer um erro de validação na entrada de dados, retornar uma mensagem de erro.

- Usar o Insomnia para exportar as rotas em arquivo json e adicione junto com o projeto backend.

### Frontend

#### Tela Inicial

- Essa tela terá um cabeçalho com o nome da aplicação, uma listagem de produtos vindos da API criada anteriormente e um botão para adicionar novos produtos.

- O retorno desta requisição da API com a lista dos produtos deve ser gravado no Redux.

- A listagem deve ser construída consumindo o estado do Redux.

- A listagem deve possuir os campos: nome, descrição e um link para a página de detalhes do produto.

#### Tela de Detalhes

- O usuário ao clicar em algum produto, ele irá para a tela de detalhes. Ao entrar nesta tela, deve ser feito uma nova requisição para consumir os dados deste produto e exibir em uma lista, os detalhes não precisam ser gravados no Redux.

- A partir desse retorno, deve-se montar na tela um cadastro com os campos: nome, descrição e preço do produto.

- O usuário poderá alterar o produto e salvar, ou excluir o produto.

- Essa tela deve ter um botão para voltar à tela inicial.

## :heavy_check_mark: O que será avaliado?

### Backend

- Conhecimento do Node.js, framework Express e suas bibliotecas utilizadas;

- Código Javascript;

- Uso de migrations, rotas, modelos e controles;

- Performance e segurança.

### Frontend

- Conhecimento do framework React e suas bibliotecas utilizadas;

- Código HTML, CSS e Javascript;

- Uso de componentização;

- Design e criatividade;

- Perfomance.

### Ambos

- Boas práticas com o código (lint, indentação, padrões, etc);

- Organização e estrutura do projeto;

- Uso do Git;

- Documentação.

## :question: Dúvidas

Em caso de dúvidas, crie uma issue ou envie um e-mail para `vagas@datasmart.com.br`.

Boa sorte!

---

Desenvolvido com 💖 por Datasmart